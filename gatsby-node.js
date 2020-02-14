const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const post = path.resolve('src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    title
                    date(formatString: "DD/MM")
                    path
                  }
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges
        posts.forEach(({frontmatter}) => {
          // const { frontmatter } = JSON.parse(JSON.stringify(node))
          // console.log(JSON.stringify(node))
          console.log(frontmatter)

          createPage({
            path: frontmatter.path,
            component: post
          })
        })
        console.log(result.data)
      })
    )
  })
}