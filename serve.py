"""Local-only portfolio preview. Python standard library; no pip install needed."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading
import webbrowser


class PreviewHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=5500)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()
    if not 0 <= args.port <= 65535:
        parser.error("Port must be between 0 and 65535.")
    folder = Path(__file__).resolve().parent / "dist"
    handler = partial(PreviewHandler, directory=str(folder))
    try:
        server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    except OSError as exc:
        parser.exit(1, f"Cannot start preview: {exc}\nTry another port: py serve.py --port 5501\n")
    with server:
        url = f"http://127.0.0.1:{server.server_port}/"
        print(f"Portfolio preview: {url}", flush=True)
        print("Save your changes, then refresh the browser. Press Ctrl+C to stop.", flush=True)
        if not args.no_browser:
            timer = threading.Timer(0.5, webbrowser.open, args=(url,))
            timer.daemon = True
            timer.start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nPreview stopped.")


if __name__ == "__main__":
    main()
