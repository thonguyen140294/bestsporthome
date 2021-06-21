echo "Started!"
BRANCH="dev"

if [[ "$@" =~ "--prod" ]]; then
  BRANCH="master"
fi

echo "- Fetching new updates..."
echo "..."
git checkout $BRANCH
git pull origin $BRANCH

FILE_IS_CHANGED="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

CHECKINSTALLPACKAGE() {
  echo "- Installing modules..."
  echo "..."
	echo "$FILE_IS_CHANGED" | grep --quiet "$1" && eval "$2"
  sleep 5
}

CHECKINSTALLPACKAGE package.json "npm install"

pm2 delete WebMU
pm2 start jobs.yml
echo "- Please wait until process is done. Waiting..."
echo "..."
sleep 5

