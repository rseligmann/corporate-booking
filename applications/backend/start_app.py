import uvicorn

from core.config.settings import config

def main():
    app = f"{config.module_name}:{config.app_name}"

    uvicorn.run(app, host=config.app_host, port=config.app_port, workers=config.workers)

if __name__ == "__main__":
    main()