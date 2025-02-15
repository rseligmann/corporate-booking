import argparse
import os
import uvicorn

from core.config.settings import get_config

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", default="dev")
    args = parser.parse_args()
    return args

def main():
    args = get_args()

    os.environ["ENVIRONMENT"] = args.env

    config = get_config()

    app = f"{config.module_name}:{config.app_name}"

    uvicorn.run(app, host=config.app_host, port=config.app_port, workers=config.workers)

if __name__ == "__main__":
    main()