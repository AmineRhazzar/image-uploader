#!/bin/bash

git filter-branch -f --env-filter "
    GIT_AUTHOR_NAME='Mohammed El Amine'
    GIT_AUTHOR_EMAIL='mohammedelaminerhazzar@gmail.com'
    GIT_COMMITTER_NAME='Mohammed El Amine'
    GIT_COMMITTER_EMAIL='mohammedelaminerhazzar@gmail.com'
  " HEAD
