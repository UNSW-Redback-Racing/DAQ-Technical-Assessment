# Spyder

You are given code for a simple live telemetry application which is able to visualise sensor data streamed over a network - specifically, it is able to visualise the temperature of a Electric Vehicle battery, ensuring that it doesn't get dangerously hot and explode!

It consists of three components:

- **Data Emulator** - this is an emulator designed to generate data which appears to come from a battery temperature sensor. It streams this data over TCP to the backend streaming service.

- **Streaming Service** - this is an application that simultaneously receives a connection from the data emulator and forwards incoming packets of data to connected frontend clients over the WebSocket protocol.

- **UI** - this is a ReactJS based frontend application that you will manipulate/design to visualise the temperature of the battery.

  ![system-flow](./system-flow.svg)

## Resources

### Backend

- https://nodejs.dev/learn
- https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html
- https://www.youtube.com/watch?v=ENrzD9HAZK4
- https://www.youtube.com/watch?v=zQnBQ4tB3ZA

### Frontend

- https://ui.shadcn.com/docs
- https://nextjs.org/docs
- https://tailwindcss.com/

## Setup

**This step is optional but recommended.**

Although Docker is used to run the telemetry services for ease of development, when developing the codebase locally within an IDE, you may find that static analysis tools will not be available. To resolve this, you have to install the project node packages locally so that your IDE can analyse your code correctly. If this doesn't significantly impact your development, you may skip this step.

To do this:

- Install [Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) (`nvm`)

- Install and use Node v18.14.0 via `nvm`

  ```bash
  nvm install 18.14.0   # installs Node v18.14.0
  nvm use 18.14.0       # selects Node v18.14.0 for use
  ```

- Install node packages for `data-emulator/`
  ```bash
  cd data-emulator; npm install
  ```
- Install node packages for `streaming-service/`
  ```bash
  cd streaming-service; npm install
  ```
- Install node packages for `ui/`

  ```bash
  cd ui; npm install
  ```

  Static analysis tools should work now given the above steps. To run the system as a whole, open a terminal within the `spyder/` directory and execute `docker compose up`.

## Tasks

**You may NOT modify anything in the `data-emulator/` directory for any given task.**

**Additionally, it is assumed that your solution to each answer is justified within the `brainstorming.md` file. You may write as much content as you see fit for each question.**

1. When running the emulator, the client will occasionally recieve values in the incorrect format. This will be visible in the output of `streaming service` as well as the `ui`. Think about what is happening, and write additional code in `streaming-service` that prevents 'invalid' data from being sent to the frontend. What you wish to do with 'invalid' data is up to you, so long as it is justified in `brainstorming.md`.

2. A safe operating range for the battery temperature is 20-80 degrees. Add a feature to the backend `streaming-service` so that each time the received battery temperature exceeds this range more than 3 times in 5 seconds, the current timestamp and a simple error message is printed to console.

3. Currently the connect/disconnect button in the top right corner of the ui (frontend) does not update when data is streamed in via streaming service. Why is this occurring and what can be done to rectify this?

- **Tip:** To start/stop emulating data, you can start/stop the individual data-emulator docker container
  - To see a list of all running docker containers
    ```bash
    docker ps
    ```  
  - To stop the data-emulator docker container
    ```bash
    docker stop spyder-data-emulator-1
    ```  
  - To start the data-emulator docker container
    ```bash
    docker start spyder-data-emulator-1
    ```  

4. The NextJS frontend is currently very basic. **Using primarily tailwindCSS and Shadcn/ui components**, extend the frontend by completing the following:

- Ensure the data displayed from `streaming-service` is correct to **3 decimal places** instead of being unbounded as it is currently.
- Ensure the battery temperature value changes colours based on the current temperature (E.g. changing to red when the safe temperature range is exceeded).
  - Safe operating ranges are defined below
    | Range | Colour |
    |---------------------------------|--------|
    | Safe (20-80) | Green |
    | Nearing unsafe (20-25 or 75-80) | Yellow |
    | Unsafe (<20 or >80) | Red |
  - You may extend `globals.css` and `tailwind.config.js` where you see fit to implement these colours, or can elect to use another method (although the former is preferred).
- Create three additional features in the provided system. **These should involve visible changes in the `ui` but do not have to exclusively involve the ui** (E.g. error messages interface, light-mode toggle, graphing data).
  - To implement these, you may alter the streaming service payload if necessary.
  - You may use components other than those mentioned above if they can be justified in your `brainstorming.md` file (E.g. additional charting libraries, notifications (toast) libraries etc).
  - You are free to make more than three additional features if you're feeling creative!

5. **Optional Task** - Within the `ui` repository is a file named `page.tsx`. You should be familiar with this file from previous steps. You are tasked with seperating the **websocket** code from `page.tsx` into a new file called `data-wrapper.tsx`. This should contain any code that handles the storage/acquisition of data from streaming service. The file `data-wrapper.tsx` should contain a react context that wraps `numeric.tsx` and any other components that display data.
- To use the data stored in this file, you will need to create a context hook using createContext/useContext.
- The following is a brief introduction into creating a react context and the benefits/reasons for doing so:
https://www.w3schools.com/react/react_usecontext.asp  

## Running the System

To start the telemetry system:

```bash
cd DAQ-Technical-Assessment/spyder
docker compose up
```

To see the ui, go to [http://localhost:3000](http://localhost:3000) in your browser.

### Additional Notes

- In order to use this command you will have to install [**Docker Desktop**](https://docs.docker.com/get-started/introduction/get-docker-desktop/) for Windows/Mac/Linux or [**Docker Engine**](https://docs.docker.com/engine/install/) for Linux in the terminal locally depending on how your system is configured.
  - Running `docker compose up` the first time may take awhile which is completely ok because Docker needs to pull images and build services from scratch. Subsequent runs of `docker compose up` shouldn't take nearly as long since Docker reuses cached layers and existing containers.
- If you happen to install any new packages, you will need to run `docker compose up --build`.
  - To simplify, the reason for this is because the telemetry system runs in a containerised environment where the packages are only installed upon the containers first build. So once the containers are created (with `docker compose up`), should there be any package changes, the containers must be rebuilt (denoted by the `--build` flag) for the new packages to be installed.
- If you get stuck on a question, feel free to skip it and come back to it at the end or completely skip it overall. You do not have to complete each task sequentially.
