#include <WiFi.h>

const char* ssid = "SUPERONLINE_WiFi_6FA7";
const char* password = "XRFKA3PENU4E";

WiFiServer server(80);

String header;
String output12State = "off";
String output27State = "off";

const int output12 = 12;
const int output27 = 27;

unsigned long currentTime = millis();
unsigned long previousTime = 0;
const long timeoutTime = 2000;

void setup() {
  Serial.begin(9600);
  pinMode(output12, OUTPUT);
  pinMode(output27, OUTPUT);
  digitalWrite(output12, LOW);
  digitalWrite(output27, LOW);

  Serial.print("WiFi ağına bağlanılıyor: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi bağlı.");
  Serial.print("ESP IP Adresi: ");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Yeni istemci bağlandı.");
    previousTime = millis();
    String currentLine = "";

    while (client.connected() && (millis() - previousTime <= timeoutTime)) {
      currentTime = millis();

      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;

        if (c == '\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            if (header.indexOf("GET /12/on") >= 0) {
              Serial.println("GPIO 12 AÇIK");
              output12State = "on";
              digitalWrite(output12, HIGH);
            } else if (header.indexOf("GET /12/off") >= 0) {
              Serial.println("GPIO 12 KAPALI");
              output12State = "off";
              digitalWrite(output12, LOW);
            }

            if (header.indexOf("GET /27/on") >= 0) {
              Serial.println("GPIO 27 AÇIK");
              output27State = "on";
              digitalWrite(output27, HIGH);
            } else if (header.indexOf("GET /27/off") >= 0) {
              Serial.println("GPIO 27 KAPALI");
              output27State = "off";
              digitalWrite(output27, LOW);
            }

            // HTML Sayfası
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<meta http-equiv=\"refresh\" content=\"5\">"); // Sayfa otomatik yenilenir
            client.println("<link rel=\"icon\" href=\"data:,\">");
            client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button2 { background-color: #555555; }</style></head>");

            client.println("<body><h1>ESP32 Web Sunucu</h1>");

            client.println("<p>GPIO 12 - Durum: " + output12State + "</p>");
            if (output12State == "off") {
              client.println("<p><a href=\"/12/on\"><button class=\"button\">AÇ</button></a></p>");
            } else {
              client.println("<p><a href=\"/12/off\"><button class=\"button button2\">KAPAT</button></a></p>");
            }

            client.println("<p>GPIO 27 - Durum: " + output27State + "</p>");
            if (output27State == "off") {
              client.println("<p><a href=\"/27/on\"><button class=\"button\">AÇ</button></a></p>");
            } else {
              client.println("<p><a href=\"/27/off\"><button class=\"button button2\">KAPAT</button></a></p>");
            }

            client.println("</body></html>");

            client.stop();
            Serial.println("İstemci bağlantısı kesildi.");
            header = "";
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }
  }
}
