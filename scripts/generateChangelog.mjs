#!/usr/bin/env node

import fs from 'fs'
import { execSync } from 'child_process'

/**
 * Generate CHANGELOG entry for a new release
 */
function generateChangelog() {
  const args = process.argv.slice(2)
  const version = args[0]
  const previousTag = args[1]

  if (!version) {
    console.error('Usage: node generate-changelog.js <version> [previous-tag]')
    process.exit(1)
  }

  console.log(`Generating changelog for version ${version}...`)

  try {
    // Get commit messages since last tag
    const gitCommand = previousTag
      ? `git log ${previousTag}..HEAD --pretty=format:"%s" --no-merges`
      : `git log --pretty=format:"%s" --no-merges -10` // Last 10 commits if no previous tag

    const commits = execSync(gitCommand, { encoding: 'utf8' })
      .split('\n')
      .filter((commit) => commit.trim() && !commit.includes('[skip ci]'))
      .map((commit) => commit.trim())

    const changelogEntry = generateChangelogEntry(version, commits)
    updateChangelogFile(changelogEntry)

    console.log('✅ CHANGELOG updated successfully!')
  } catch (error) {
    console.error('Error generating changelog:', error.message)
    process.exit(1)
  }
}

function generateChangelogEntry(version, commits) {
  const today = new Date().toISOString().split('T')[0]

  const categories = {
    added: [],
    changed: [],
    fixed: [],
    removed: [],
    security: [],
    deprecated: [],
    performance: [],
    documentation: [],
    testing: [],
  }

  // Categorize commits based on conventional commit messages
  commits.forEach((commit) => {
    const lowerCommit = commit.toLowerCase()

    if (lowerCommit.startsWith('feat:') || lowerCommit.startsWith('feature:')) {
      categories.added.push(commit.replace(/^(feat|feature):\s*/i, ''))
    } else if (lowerCommit.startsWith('fix:') || lowerCommit.startsWith('bugfix:')) {
      categories.fixed.push(commit.replace(/^(fix|bugfix):\s*/i, ''))
    } else if (lowerCommit.startsWith('refact') || lowerCommit.startsWith('style:')) {
      categories.changed.push(commit.replace(/^(refactor|style):\s*/i, ''))
    } else if (lowerCommit.startsWith('perf:')) {
      categories.performance.push(commit.replace(/^perf:\s*/i, ''))
    } else if (lowerCommit.startsWith('docs:')) {
      categories.documentation.push(commit.replace(/^docs:\s*/i, ''))
    } else if (lowerCommit.startsWith('test:')) {
      categories.testing.push(commit.replace(/^test:\s*/i, ''))
    } else if (lowerCommit.startsWith('remove') || lowerCommit.startsWith('delete')) {
      categories.removed.push(commit)
    } else if (lowerCommit.startsWith('security:')) {
      categories.security.push(commit.replace(/^security:\s*/i, ''))
    } else if (lowerCommit.startsWith('deprecat')) {
      categories.deprecated.push(commit)
    } else if (
      !lowerCommit.startsWith('chore:') &&
      !lowerCommit.startsWith('ci:') &&
      !lowerCommit.startsWith('build:')
    ) {
      // General changes that don't fit other categories
      categories.changed.push(commit)
    }
  })

  let entry = `## [${version}] - ${today}\n\n`

  // Add sections only if they have content
  if (categories.added.length > 0) {
    entry += '### ✨ Added\n'
    categories.added.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.changed.length > 0) {
    entry += '### 🔧 Changed\n'
    categories.changed.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.fixed.length > 0) {
    entry += '### 🐛 Fixed\n'
    categories.fixed.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.performance.length > 0) {
    entry += '### ⚡ Performance\n'
    categories.performance.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.security.length > 0) {
    entry += '### 🔒 Security\n'
    categories.security.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.deprecated.length > 0) {
    entry += '### ⚠️ Deprecated\n'
    categories.deprecated.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.removed.length > 0) {
    entry += '### 🗑️ Removed\n'
    categories.removed.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.documentation.length > 0) {
    entry += '### 📚 Documentation\n'
    categories.documentation.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  if (categories.testing.length > 0) {
    entry += '### 🧪 Testing\n'
    categories.testing.forEach((item) => (entry += `- ${item}\n`))
    entry += '\n'
  }

  // If no categorized changes, add a general entry
  if (Object.values(categories).every((cat) => cat.length === 0)) {
    entry += `### 🔧 What's Changes\n`
    entry += '- Release updates and improvements\n\n'
  }

  return entry
}

function updateChangelogFile(newEntry) {
  const changelogPath = './CHANGELOG.md'

  if (!fs.existsSync(changelogPath)) {
    // Create initial changelog if it doesn't exist
    const initialContent = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

${newEntry}

---

*This changelog is automatically updated by the release pipeline.*`

    fs.writeFileSync(changelogPath, initialContent)
    return
  }

  // Read existing changelog
  const existingContent = fs.readFileSync(changelogPath, 'utf8')

  // Find the position to insert the new entry (after ## [Unreleased])
  const unreleasedIndex = existingContent.indexOf('## [Unreleased]')

  if (unreleasedIndex === -1) {
    console.error('Could not find [Unreleased] section in CHANGELOG.md')
    process.exit(1)
  }

  // Find the end of the unreleased section
  const nextSectionIndex = existingContent.indexOf('\n## [', unreleasedIndex + 1)
  const insertPosition = nextSectionIndex === -1 ? existingContent.length : nextSectionIndex

  // Insert the new entry
  const beforeInsert = existingContent.substring(0, insertPosition)
  const afterInsert = existingContent.substring(insertPosition)

  const updatedContent = beforeInsert + '\n' + newEntry + afterInsert

  fs.writeFileSync(changelogPath, updatedContent)
}

// Run the script
generateChangelog()
