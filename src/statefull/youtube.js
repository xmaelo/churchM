
class youtube_api {
    getAllPlaylistOfchanel = async () => {
        let url="https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCwTy1VL6JbReWfCkN0OYJYw&key=AIzaSyAM20Fs_UIdz3ujlJXwHwXby6f_HOS2z3s";
        return await fetch(url, {
            method: 'GET',
       }).then(
        (response) => response.json()
      ).then(
        (responseJson) => {
          return responseJson;
        }
      );
      }
    
    
      getAllvideoOfPlaylist = async (idplaylist) => {
        let url="https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId="+idplaylist+"&key=AIzaSyAM20Fs_UIdz3ujlJXwHwXby6f_HOS2z3s";
        return await fetch(url, {
            method: 'GET',
       }).then(
        (response) => response.json()
      ).then(
        (responseJson) => {
          return responseJson;
        }
      );
      }
    
      getAllvideoOfChanel = async () => {
        let url="https://www.googleapis.com/youtube/v3/search?key=AIzaSyAM20Fs_UIdz3ujlJXwHwXby6f_HOS2z3s&channelId=UCwTy1VL6JbReWfCkN0OYJYw&part=snippet,id&order=date&maxResults=2000";
        return  await fetch(url, {
            method: 'GET',
       }).then(
        (response) => response.json()
      ).then(
        (responseJson) => {
          return responseJson;
        }
      );
      }
}

export const youtube = new youtube_api();