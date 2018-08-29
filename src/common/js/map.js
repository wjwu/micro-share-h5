export const getAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    try {
      let latLng = new window.qq.maps.LatLng(latitude, longitude);
      // gps坐标转腾讯地图坐标
      window.qq.maps.convertor.translate(latLng, 1, result => {
        const transLat = result[0].lat;
        const transLng = result[0].lng;
        latLng = new window.qq.maps.LatLng(transLat, transLng);
        const geocoder = new window.qq.maps.Geocoder();
        geocoder.getAddress(latLng);
        geocoder.setComplete(result => {
          const {
            province,
            city,
            district,
            street
          } = result.detail.addressComponents;
          resolve({
            address: `${province}${city}${district}${street}`,
            latitude: transLat,
            longitude: transLng
          });
        });
        geocoder.setError(error => {
          reject(error);
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};
