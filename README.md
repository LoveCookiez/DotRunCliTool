# DotRunCliTool

Note: The only currently supported FilePath format is like this:

MainFolder/
          Project1/Project1/Project1.csproj
          or with /src/
          Project2/src/Project2/Projects2.csproj


# [Description]

Select and run multiple dotnet projects, assuming they are all inside their own folder and share a parent folder.


This might be changed in the future, but it is for a work related project, hence more of work tool.

# [Install]

You'll need Node.js to run this.
After you clone the repo, run npm install, followed by npm i -g. This will install the package globally on your system.

# [Usage]

Go inside the main project which contains your subfolders for your dotnet projects and run 'dotrun'.
After your first run, it will remember previously selected projects and they will be already selected when running the tool again.
