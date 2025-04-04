# Frontend Project

Bu proje, kullanıcıların kayıt olabileceği, giriş yapabileceği ve detay bilgilerini görüntüleyebileceği bir web uygulaması geliştirmek amacıyla oluşturulmuştur.

## Proje Yapısı

- **public/index.html**: Uygulamanın ana HTML dosyasıdır. Uygulamanın yapısını ve başlangıç noktalarını içerir.
- **public/detail.html**: Detay sayfasının HTML içeriğini barındırır. Kullanıcı detay bilgilerini görüntülemek için bu sayfaya yönlendirilir.
- **src/css/styles.css**: Uygulamanın stil dosyasıdır. HTML elemanlarının görünümünü ve düzenini belirleyen CSS kurallarını içerir.
- **src/js/script.js**: Uygulamanın JavaScript kodunu içerir. Kullanıcı kayıt, giriş ve detay sayfasına yönlendirme gibi işlevleri barındırır. `registerUser`, `loginUser` ve `goToDetail` fonksiyonlarını içerir.
- **package.json**: npm için yapılandırma dosyasıdır. Projenin bağımlılıklarını ve script'lerini listeler.

## Kurulum

1. Projeyi klonlayın veya indirin.
2. Terminalde proje dizinine gidin.
3. `npm install` komutunu çalıştırarak gerekli bağımlılıkları yükleyin.

## Kullanım

- Kullanıcılar `index.html` üzerinden kayıt olabilir.
- Kayıtlı kullanıcılar `home.html` üzerinden giriş yapabilir.
- Kullanıcılar detay bilgilerini görüntülemek için `detail.html` sayfasına yönlendirilir.