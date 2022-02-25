@echo off

IF [%1] == [] GOTO HELP
set ver=%1

git status

setlocal
echo.
echo ### CHECK YOUR WORKSPACE IS EMPTY ###
echo.
SET /P CHOICE=Publish version %ver%? (Y/N)
IF /I "%CHOICE%" NEQ "Y" GOTO END

echo.
echo Building...
call npm run build || GOTO FAILED

echo Setting version...
call npm version %ver% --no-git-tag-version --allow-same-version || GOTO FAILED

echo Publishing to npm...
call npm publish || GOTO FAILED

echo.
SET /P CHOICE=Push tags (Y/[N])?
IF /I "%CHOICE%" NEQ "Y" GOTO END

echo.
echo Pushing tag...

git tag -a %ver% -m %ver% || GOTO FAILED
git push origin %ver% || GOTO FAILED

echo.
echo Complete.
echo.
ECHO Now clear your workspace: git reset --hard

GOTO END

:HELP
echo.
echo USAGE: publish 1.2.3
GOTO END

:FAILED
echo.
echo FAILED
GOTO END

:END
endlocal
