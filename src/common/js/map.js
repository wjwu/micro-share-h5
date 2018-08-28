export const getAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    try {
      let latLng = new window.qq.maps.LatLng(latitude, longitude);
      // gps坐标转腾讯地图坐标
      window.qq.maps.convertor.translate(latLng, 1, result => {
        latLng = new window.qq.maps.LatLng(result[0].lat, result[0].lng);
        const geocoder = new window.qq.maps.Geocoder();
        geocoder.getAddress(latLng);
        geocoder.setComplete(result => {
          const {
            province,
            city,
            district,
            street
          } = result.detail.addressComponents;
          resolve(`${province}${city}${district}${street}`);
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
