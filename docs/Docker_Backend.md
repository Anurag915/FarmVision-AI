# Learning step 1: containerize the backend

Run commands from the project root in PowerShell.

## Build an image

```powershell
docker build -t agriculture-api:local .
```

The Dockerfile installs Python API dependencies, copies the Flask code and the
required model/data files, and defines how to start Gunicorn. The image is the
packaged application. `local` is the image tag for this learning exercise.

`requirements-api.txt` contains the API's direct runtime dependencies rather than
the full development environment in `requirements.txt`. Transitive dependencies
and the base image tag are not fully locked yet; release hardening comes later.

`.dockerignore` limits the build context to backend inputs. It excludes your
virtual environment, frontend dependencies, Git history, and unrelated datasets.

## Run a container

```powershell
docker run --rm --name agriculture-api -p 127.0.0.1:5000:5000 agriculture-api:local
```

The container is a running instance of the image. Leave this terminal open.
The port mapping forwards port 5000 on your computer to port 5000 in the
container. Gunicorn listens on `0.0.0.0` inside the container so Docker can reach it.
`EXPOSE` in the Dockerfile documents the port; `-p` publishes it.

In another terminal:

```powershell
Invoke-RestMethod http://localhost:5000/
Invoke-RestMethod http://localhost:5000/api/metadata/states
```

The first request should report success. The second exercises the loaded datasets.
These checks verify startup and metadata access; prediction behavior needs its own check.

Use Ctrl+C in the container terminal to stop it. `--rm` removes the stopped
container while preserving the image. If port 5000 is already occupied, use
`-p 127.0.0.1:5001:5000` and visit port 5001 instead.

## What changes when code changes?

This image contains a snapshot of the code, models, and datasets. Editing local
files does not change the running container. Rebuild the image and create a new
container to run the updated code. Later, CI will build these images and GitOps
will declare which image Kubernetes should run.

Next: package the frontend and connect both containers through Docker Compose.
