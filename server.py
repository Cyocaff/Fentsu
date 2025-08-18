# Fentsu framework temporal server process.
import http.server
import socketserver
PORT = 8002
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print(self.path)
        if self.path[0:7] == '/static':
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            with open("templates/base.html", "rb") as f:
                self.wfile.write(f.read())


socketserver.TCPServer.allow_reuse_address = True  
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()