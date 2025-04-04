#include <WiFi.h>

const char* ssid = "SUPERONLINE_WiFi_6FA7";
const char* password = "XRFKA3PENU4E";

void setup() {
  Serial.begin(9600);
   delay(2000);
  WiFi.begin(ssid, password);  // "Wifi" değil "WiFi" (büyük/küçük harf önemli!)
  
  Serial.print("WiFi bağlanıyor");
  while (WiFi.status() != WL_CONNECTED) {  // Noktalı virgül kaldırıldı!
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi bağlandı!");
  Serial.print("ESP IP Adresi: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Ana kod buraya yazılır
}