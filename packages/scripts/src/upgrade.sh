#!/bin/bash

# Check if a remote branch was passed as an argument
if [ $# -lt 1 ]; then
  echo "Usage: $0 'remote/branch'"
  exit 1
fi

# The argument is the remote branch
REMOTE_BRANCH="$1"

# Fetch the latest changes from the remote
git fetch $(echo $REMOTE_BRANCH | cut -d '/' -f 1)

# Get the latest commit message from the remote branch that's also in the current branch
LATEST_COMMON_COMMIT_MESSAGE=$(git log --format="%s" "$REMOTE_BRANCH" | grep -F -x -f <(git log --format="%s") | head -n 1)

# Initialize an array to hold the commit hashes and messages for cherry-picking
declare -a commits_to_pick

# Compare and gather commit hashes and messages from the remote branch
# Exclude commits containing "custom" in their message
while IFS= read -r line; do
  commit_hash=$(echo $line | awk '{print $1}')
  commit_message=$(echo $line | cut -d ' ' -f 2-)

  if [[ "$commit_message" == "$LATEST_COMMON_COMMIT_MESSAGE" ]]; then
    break
  elif [[ "$commit_message" != *"custom"* ]]; then
    commits_to_pick+=("$commit_hash - $commit_message")
  fi
done < <(git log "$REMOTE_BRANCH" --format="%H %s")

# Check if there are commits to cherry-pick
if [ ${#commits_to_pick[@]} -eq 0 ]; then
  echo "No commits selected for cherry-picking."
  exit 0
fi

# Log the commit hashes and messages to be cherry-picked
echo "Commits to be cherry-picked from $REMOTE_BRANCH:"
for commit in "${commits_to_pick[@]}"; do
  echo "$commit"
done

# Ask for user confirmation before cherry-picking
read -p "Do you want to proceed with cherry-picking these commits? (yes/no) " confirmation
if [[ "$confirmation" != "yes" ]]; then
  echo "Cherry-picking aborted."
  exit 0
fi

# Cherry-pick commits one by one
for commit_info in "${commits_to_pick[@]}"; do
  commit_hash=$(echo "$commit_info" | cut -d ' ' -f 1)
  echo "Cherry-picking $commit_info..."
  git cherry-pick $commit_hash

  # Check if cherry-pick is successful
  if [ $? -ne 0 ]; then
    echo "Conflict detected! Resolve the conflict and continue cherry-picking."
    read -p "After resolving conflict, press enter to continue with the next commit..."
    git cherry-pick --continue
  fi
done

echo "Cherry-picking completed."
