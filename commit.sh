#!/bin/bash

commit_type="$1"
commit_message="$2"

if [ -z "$commit_type" ] || [ -z "$commit_message" ]; then
  echo "Usage: $0 <commit_type> <commit_message>"
  exit 1
fi

# Commit type에 따른 이모지와 접두사 매핑
case "$commit_type" in
  "-r")
    emoji=":recycle:"
    prefix="[refactor]"
    ;;
  "-f")
    emoji=":sparkles:"
    prefix="[feat]"
    ;;
  "-b")
    emoji=":bug:"
    prefix="[fix]"
    ;;
  "-d")
    emoji=":memo:"
    prefix="[merge]"
    ;;
  *)
    echo "Invalid commit type. Supported types: -r(refactor), -f(feat), -d(documentation)"
    exit 1
    ;;
esac

git add .

# 커밋 수행
commit_header="$emoji $prefix"
final_commit_message="$commit_header $commit_message"
git commit -m "$final_commit_message"