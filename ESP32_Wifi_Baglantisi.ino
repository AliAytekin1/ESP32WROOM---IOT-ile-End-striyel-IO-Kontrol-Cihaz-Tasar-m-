#include <WiFi.h>

// WiFi bilgileri
const char* ssid = "SUPERONLINE_WiFi_6FA7";
const char* password = "XRFKA3PENU4E";

// Sunucu tanımı
WiFiServer server(80);

// GPIO pin durumları
String header;
String output12State = "OFF";
String output27State = "OFF";

const int output12 = 12;
const int output27 = 27;

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

  Serial.println("\nWiFi bağlı.");
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
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;

        if (c == '\n') {
          if (currentLine.length() == 0) {
            // HTTP başlıkları
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // GPIO 12 kontrolü
            if (header.indexOf("GET /12/ON") >= 0) {
              Serial.println("GPIO 12 ON");
              output12State = "ON";
              digitalWrite(output12, HIGH);
            } else if (header.indexOf("GET /12/OFF") >= 0) {
              Serial.println("GPIO 12 OFF");
              output12State = "OFF";
              digitalWrite(output12, LOW);
            }

            // GPIO 27 kontrolü
            if (header.indexOf("GET /27/ON") >= 0) {
              Serial.println("GPIO 27 ON");
              output27State = "ON";
              digitalWrite(output27, HIGH);
            } else if (header.indexOf("GET /27/OFF") >= 0) {
              Serial.println("GPIO 27 OFF");
              output27State = "OFF";
              digitalWrite(output27, LOW);
            }

            // HTML Sayfası
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<meta http-equiv=\"refresh\" content=\"5\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            client.println("<style>html { font-family: Helvetica; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button2 { background-color: #555555; }</style></head>");

            client.println("<body><h1>ESP32 Web Sunucu</h1>");

            // GPIO 12 Durumu
            client.println("<p>GPIO 12 - Durum: <strong>" + output12State + "</strong></p>");
            if (output12State == "OFF") {
              client.println("<p><a href=\"/12/ON\"><button class=\"button\">ON</button></a></p>");
            } else {
              client.println("<p><a href=\"/12/OFF\"><button class=\"button button2\">OFF</button></a></p>");
            }

            // GPIO 27 Durumu
            client.println("<p>GPIO 27 - Durum: <strong>" + output27State + "</strong></p>");
            if (output27State == "OFF") {
              client.println("<p><a href=\"/27/ON\"><button class=\"button\">ON</button></a></p>");
            } else {
              client.println("<p><a href=\"/27/OFF\"><button class=\"button button2\">OFF</button></a></p>");
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
