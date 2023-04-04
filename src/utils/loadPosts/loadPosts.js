export const loadPosts = async () => {
  //puxando a api de posts
  const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
  //puxando a api das fotos
  const photoResponse = fetch("https://jsonplaceholder.typicode.com/photos");

  const [posts, photo] = await Promise.all([postResponse, photoResponse]);

  const postsJson = await posts.json();
  const photosJson = await photo.json();

  // unindo a api de posts com a api de fotos
  //e pegando somente a url da api de fotos
  const postAndPhoto = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });

  return postAndPhoto;
};
