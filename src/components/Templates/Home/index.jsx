import "./style.css";
import { Component } from "react";

import { TextInput } from "../../TextInput";
import { Posts } from "../../Posts";
import { loadPosts } from "../../../utils/loadPosts/loadPosts";
import { Button } from "../../Button";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: "",
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postAndPhoto = await loadPosts();
    const { page, postsPerPage } = this.state;
    // colocando a união das api no state
    this.setState({
      posts: postAndPhoto.slice(page, postsPerPage),
      allPosts: postAndPhoto,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPages = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPages, nextPages + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPages });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;
    return (
      <section className="container">
        <TextInput searchValue={searchValue} handleChange={this.handleChange} />
        <br />
        <br />
        <br />
        <br />

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}

        {filteredPosts.length === 0 && <h3>Nenhum Post encontrado =(</h3>}

        {!searchValue && (
          <div className="button-container">
            <Button
              text={"Load more post"}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          </div>
        )}
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
