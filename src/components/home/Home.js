import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSubscribedPosts } from "../../managers/PostManager"

export const Home = () => {
  const [subscribedPosts, setSubscribedPosts] = useState([])

  useEffect(() => {
    getSubscribedPosts().then(setSubscribedPosts)
  }, [])

  return (
    <div className="container">
      {subscribedPosts.length === 0 ? (
        <div>
          <section className="hero is-success is-medium">
            <div className="hero-body">
              <p className="title">Welcome to Rare Publishing</p>
              <p className="subtitle">
                A community for thoughtful readers and writers. Subscribe to authors you love and build your personal feed.
              </p>
            </div>
          </section>

          <div className="notification is-light mt-5">
            <p>
              When you subscribe to an author, their new posts will appear right here in your feed — no searching required.
            </p>
          </div>

          <div className="columns mt-4">
            <div className="column">
              <div className="box">
                <p className="title is-5">Step 1</p>
                <p className="subtitle is-6">Browse All Posts</p>
                <p>
                  Head to the <Link to="/posts">Posts page</Link> to see everything published on Rare. Find topics and writing styles you enjoy.
                </p>
              </div>
            </div>

            <div className="column">
              <div className="box">
                <p className="title is-5">Step 2</p>
                <p className="subtitle is-6">Find an Author You Like</p>
                <p>
                  Click an author's name on any post to visit their profile and see everything they have written.
                </p>
              </div>
            </div>

            <div className="column">
              <div className="box">
                <p className="title is-5">Step 3</p>
                <p className="subtitle is-6">Subscribe</p>
                <p>
                  Click <strong>Subscribe</strong> on their profile. Their future posts will show up right here automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="has-text-centered mt-5">
            <Link to="/posts" className="button is-primary is-medium">
              Browse Posts
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h2 className="title is-4 mt-4">Posts from Subscriptions</h2>
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {subscribedPosts.map(post => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td><Link to={`/profiles/${post.user.id}`}>{post.user.username}</Link></td>
                  <td>{post.category ? post.category.label : "—"}</td>
                  <td>{post.publication_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
