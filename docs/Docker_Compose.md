# Learning step 2: run frontend and backend together

From the project root:

```powershell
docker compose up --build -d
docker compose ps
```

Open http://localhost:8080 and submit a prediction in the UI.

## Request flow

Browser -> localhost:8080 -> frontend Nginx container

- Page/assets: Nginx serves the built React application.
- /api/...: Nginx forwards the request to backend:5000 on the Compose network.
- Flask loads the packaged models/data and returns a response.

`backend` is a service name that Docker resolves inside its network. The browser
does not use that name; it sends requests to the same localhost:8080 origin.
Only the frontend port is published to your computer.

The frontend Dockerfile uses two stages. Node builds the React files; Nginx
serves those files. Node is not included in the final frontend image.
VITE_API_URL=/api is set during the build, because Vite embeds configuration
in its browser bundle. Local .env files are excluded from the build context.

Compose waits for the backend's startup health check before starting the frontend.
The health check verifies HTTP startup, not prediction accuracy. Docker health
status alone does not automatically restart an unhealthy container.

## Useful commands

```powershell
docker compose logs -f
docker compose down
```

Press Ctrl+C to leave the log viewer; detached containers keep running.
`down` stops and removes this Compose project's containers and network, retaining
the built images. Use `up --build -d` again after editing application code.

## Connection to GitOps

compose.yaml declares the local services and how they connect. You currently
apply it yourself with `docker compose up`. Later, Kubernetes manifests will
declare the cluster workloads, and Argo CD will continuously reconcile them
against Git. This Compose setup is a preparation step, not a GitOps controller.
