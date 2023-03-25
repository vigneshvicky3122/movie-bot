const express = require("express");
const { mailer } = require("./nodemailer");
const { uploadFile } = require("./S3");
const { hashPassword, hashCompare } = require("./hashPassword");
const { authentication, createToken } = require("./auth");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");
const Client = new MongoClient(process.env.DB_URL);
const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  express.json({ limit: "3gb", extended: true, parameterLimit: 50000 }),
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/dashboard", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let users = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find()
      .toArray();
    let story = await Db.collection(process.env.DB_COLLECTION_THREE)
      .find()
      .toArray();
    let post = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find()
      .toArray();
    if (users && story && post) {
      res.json({
        statusCode: 200,
        users,
        story,
        post,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    Client.close();
  }
});

app.get("/edit_profile/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.params.id })
      .toArray();
    if (user) {
      res.json({
        statusCode: 200,
        user,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.get("/username", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find()
      .toArray();
    if (user) {
      res.json({
        statusCode: 200,
        user,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});

app.get("/post", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let post = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find()
      .toArray();
    if (post) {
      res.json({
        statusCode: 200,
        post,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});

app.get("/myData/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.params.id })
      .toArray();
    let post = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find({ "Author.username": req.params.id })
      .toArray();
    let story = await Db.collection(process.env.DB_COLLECTION_THREE)
      .find({ Author: req.params.id })
      .toArray();
    if (user) {
      res.json({
        statusCode: 200,
        user,
        post,
        story,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.get("/post/:id", authentication, async (req, res) => {
  await Client.connect();

  try {
    const Db = Client.db(process.env.DB_NAME);
    let post = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find({ _id: ObjectId(req.params.id) })
      .toArray();

    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.headers.username })
      .toArray();
    if (user) {
      res.json({
        statusCode: 200,
        post,
        user,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "couldn't connect",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/edit-post/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    if (req.body.Image.includes(process.env.AWS_CLOUDFRONT_KEY)) {
      const Db = Client.db(process.env.DB_NAME);
      let update = await Db.collection(
        process.env.DB_COLLECTION_TWO
      ).findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            Caption: req.body.Caption,
            Location: req.body.Location,
            Tags: req.body.Tags,
            Image: req.body.Image,
          },
        }
      );
      if (update) {
        res.json({
          statusCode: 200,
          message: "upload successful",
        });
      } else {
        res.json({
          statusCode: 401,
          message: "upload failed",
        });
      }
    } else {
      const result = await uploadFile(req.body.Image);
      const Db = Client.db(process.env.DB_NAME);
      let update = await Db.collection(
        process.env.DB_COLLECTION_TWO
      ).findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            Caption: req.body.Caption,
            Location: req.body.Location,
            Tags: req.body.Tags,
            Image: process.env.AWS_CLOUDFRONT_KEY + result.Key,
          },
        }
      );

      if (update) {
        res.json({
          statusCode: 200,
          message: "upload successful",
        });
      } else {
        res.json({
          statusCode: 401,
          message: "upload failed",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/edit_profile", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.headers.username })
      .toArray();

    var profile;

    if (req.body.ProfilePic.includes(process.env.AWS_CLOUDFRONT_KEY)) {
      profile = req.body.ProfilePic;
    } else {
      const result = await uploadFile(req.body.ProfilePic);
      profile = process.env.AWS_CLOUDFRONT_KEY + result.Key;
    }

    let update = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).findOneAndUpdate(
      { username: user[0].username },
      {
        $set: {
          bio: req.body.Bio,
          username: req.body.Username,
          name: req.body.Name,
          profilePic: profile,
          mobile: req.body.Mobile,
          email: req.body.Email,
        },
      }
    );
    let verify = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.body.Username })
      .toArray();

    let checkAuthor = await Db.collection(process.env.DB_COLLECTION_TWO)
      .find({ "Author.username": user[0].username })
      .toArray();

    for (let index = 0; index < checkAuthor.length; index++) {
      const id = checkAuthor[index]._id;

      let updatePost = await Db.collection(
        process.env.DB_COLLECTION_TWO
      ).findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            Author: {
              username: verify[0].username,
              profilePic: verify[0].profilePic,
            },
          },
        }
      );
    }
    let checkStory = await Db.collection(process.env.DB_COLLECTION_THREE)
      .find({ "Author.username": user[0].username })
      .toArray();

    for (let index = 0; index < checkStory.length; index++) {
      const id = checkStory[index]._id;

      let updatePost = await Db.collection(
        process.env.DB_COLLECTION_THREE
      ).findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            Author: {
              username: verify[0].username,
              profilePic: verify[0].profilePic,
            },
          },
        }
      );
    }

    let checkLikes = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).updateMany({ Likes: { $regex: user[0].username } }, [
      {
        $set: {
          Likes: {
            $map: {
              input: "$Likes",
              in: {
                $replaceOne: {
                  input: "$$this",
                  find: user[0].username,
                  replacement: verify[0].username,
                },
              },
            },
          },
        },
      },
    ]);
    let checkSaved = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).updateMany({ Saved: { $regex: user[0].username } }, [
      {
        $set: {
          Saved: {
            $map: {
              input: "$Saved",
              in: {
                $replaceOne: {
                  input: "$$this",
                  find: user[0].username,
                  replacement: verify[0].username,
                },
              },
            },
          },
        },
      },
    ]);
    let checkComment = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).updateMany(
      {
        Comments: { $elemMatch: { commentedBy: user[0].username } },
      },
      {
        $set: { "Comments.$.commentedBy": verify[0].username },
      }
    );

    let checkFollowing = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).updateMany({ Following: { $regex: user[0].username } }, [
      {
        $set: {
          Following: {
            $map: {
              input: "$Following",
              in: {
                $replaceOne: {
                  input: "$$this",
                  find: user[0].username,
                  replacement: verify[0].username,
                },
              },
            },
          },
        },
      },
    ]);
    let checkFollowers = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).updateMany({ Followers: { $regex: user[0].username } }, [
      {
        $set: {
          Followers: {
            $map: {
              input: "$Followers",
              in: {
                $replaceOne: {
                  input: "$$this",
                  find: user[0].username,
                  replacement: verify[0].username,
                },
              },
            },
          },
        },
      },
    ]);

    if (checkComment) {
      res.json({
        statusCode: 200,
        message: "upload successful",
        username: verify[0].username,
        profilePic: profile,
        name: verify[0].name,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/post", authentication, async (req, res) => {
  await Client.connect();
  try {
    const result = await uploadFile(req.body.Image);
    const Db = Client.db(process.env.DB_NAME);
    let users = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.headers.username })
      .toArray();

    const updateData = {
      Caption: req.body.Caption,
      Location: req.body.Location,
      Tags: req.body.Tags,
      Image: process.env.AWS_CLOUDFRONT_KEY + result.Key,
      Time: req.body.Time,
      Author: { username: users[0].username, profilePic: users[0].profilePic },
      Likes: [],
      Saved: [],
      Comments: [],
    };

    let post = await Db.collection(process.env.DB_COLLECTION_TWO).insertOne(
      updateData
    );

    if (post) {
      res.json({
        statusCode: 200,
        message: "upload successful",
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
// app.post("/story", authentication, async (req, res) => {
//   await Client.connect();
//   try {
//     const Db = Client.db(process.env.DB_NAME);
//     let story = await Db.collection(process.env.DB_COLLECTION_THREE).insertOne(
//       req.body
//     );
//     if (story) {
//       res.json({
//         statusCode: 200,
//         message: "upload successful",
//       });
//     } else {
//       res.json({
//         statusCode: 401,
//         message: "upload failed",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({
//       statusCode: 500,
//       message: "internal server error",
//     });
//   } finally {
//     await Client.close();
//   }
// });

app.put("/like/:id", authentication, async (req, res) => {
  await Client.connect();

  try {
    const Db = Client.db(process.env.DB_NAME);
    let like = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $push: { Likes: req.body.likedBy } }
    );
    if (like) {
      res.json({
        statusCode: 200,
        message: `you liked that post ${req.params.id}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/unLike/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let unlike = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $pull: { Likes: req.body.likedBy } }
    );
    if (unlike) {
      res.json({
        statusCode: 200,
        message: `you unliked that post ${req.params.id}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/comments/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let comments = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $push: { Comments: req.body } }
    );
    if (comments) {
      res.json({
        statusCode: 200,
        message: `you Commented that post ${req.params.id}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/Saved/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let saved = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $push: { Saved: req.body.savedBy } }
    );
    if (saved) {
      res.json({
        statusCode: 200,
        message: `you Saved that post ${req.params.id}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/unSaved/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let saved = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).findOneAndUpdate(
      { _id: ObjectId(req.params.id) },
      { $pull: { Saved: req.body.savedBy } }
    );
    if (saved) {
      res.json({
        statusCode: 200,
        message: `you unSaved that post ${req.params.id}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});

// app.put("/highlight/:id", authentication, async (req, res) => {
//   await Client.connect();
//   try {
//     const Db = Client.db(process.env.DB_NAME);
//     let highlight = await Db.collection(
//       process.env.DB_COLLECTION_THREE
//     ).findOneAndUpdate(
//       { _id: ObjectId(req.params.id) },
//       { $push: { Highlights: req.body } }
//     );
//     if (highlight) {
//       res.json({
//         statusCode: 200,
//         message: `you added to highlights that Story ${req.params.id}`,
//       });
//     } else {
//       res.json({
//         statusCode: 401,
//         message: "upload failed",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({
//       statusCode: 500,
//       message: "internal server error",
//     });
//   } finally {
//     await Client.close();
//   }
// });
// app.put("/favorites/:id", authentication, async (req, res) => {
//   await Client.connect();
//   try {
//     const Db = Client.db(process.env.DB_NAME);
//     let person = await Db.collection(process.env.DB_COLLECTION_ONE)
//       .find({ _id: ObjectId(req.params.id) })
//       .toArray();
//     let favorites = await Db.collection(
//       process.env.DB_COLLECTION_ONE
//     ).findOneAndUpdate(
//       { username: user[0].username },
//       { $push: { Favorites: { username: person[0].username } } }
//     );
//     if (favorites) {
//       res.json({
//         statusCode: 200,
//         message: `you added to favorites that user ${person[0].username}`,
//       });
//     } else {
//       res.json({
//         statusCode: 401,
//         message: "upload failed",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({
//       statusCode: 500,
//       message: "internal server error",
//     });
//   } finally {
//     await Client.close();
//   }
// });
// app.put("/removeFavorites/:id", authentication, async (req, res) => {
//   await Client.connect();
//   try {
//     const Db = Client.db(process.env.DB_NAME);
//     let person = await Db.collection(process.env.DB_COLLECTION_ONE)
//       .find({ _id: ObjectId(req.params.id) })
//       .toArray();
//     let remove = await Db.collection(
//       process.env.DB_COLLECTION_ONE
//     ).findOneAndUpdate(
//       { username: user[0].username },
//       { $pull: { Favorites: { username: person[0].username } } }
//     );
//     if (remove) {
//       res.json({
//         statusCode: 200,
//         message: `you remove to favorites that user ${person[0].username}`,
//       });
//     } else {
//       res.json({
//         statusCode: 401,
//         message: "upload failed",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({
//       statusCode: 500,
//       message: "internal server error",
//     });
//   } finally {
//     await Client.close();
//   }
// });

app.put("/follow/:id", authentication, async (req, res) => {
  await Client.connect();

  try {
    const Db = Client.db(process.env.DB_NAME);
    let following = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).findOneAndUpdate(
      { username: req.params.id },
      { $push: { Following: req.body.followingTo } }
    );
    let followers = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).findOneAndUpdate(
      { username: req.body.followingTo },
      { $push: { Followers: req.params.id } }
    );
    if (followers && following) {
      res.json({
        statusCode: 200,
        message: `you following that user ${req.body.followingTo}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/unfollow/:id", authentication, async (req, res) => {
  await Client.connect();

  try {
    const Db = Client.db(process.env.DB_NAME);
    let unfollow = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).findOneAndUpdate(
      { username: req.params.id },
      { $pull: { Following: req.body.followingTo } }
    );

    let followers = await Db.collection(
      process.env.DB_COLLECTION_ONE
    ).updateOne(
      { username: req.body.followingTo },
      { $pull: { Followers: req.params.id } }
    );

    if (followers && unfollow) {
      res.json({
        statusCode: 200,
        message: `you unfollow that user ${req.body.followingTo}`,
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/signup", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let email = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ email: req.body.email })
      .toArray();
    let username = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ username: req.body.username })
      .toArray();
    if ((username.length === 0) & (email.length === 0)) {
      let hash_password = await hashPassword(req.body.password);
      let userData = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hash_password,
        Followers: [],
        Following: [],
      };
      let user = await Db.collection(process.env.DB_COLLECTION_ONE).insertOne(
        userData
      );
      if (user) {
        res.json({
          statusCode: 200,
          message: "Signup successful",
        });
      }
    } else {
      res.json({
        statusCode: 401,
        message: "User was already exist please login...",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/login", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let users = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ email: req.body.email })
      .toArray();
    if (users.length === 1) {
      let hashResult = await hashCompare(req.body.password, users[0].password);
      if (hashResult) {
        let token = await createToken({
          email: users[0].email,
          username: users[0].username,
          name: users[0].name,
        });
        if (token) {
          res.json({
            statusCode: 200,
            message: "Login successful",
            token,
            users,
          });
        }
      } else {
        res.json({
          statusCode: 401,
          message: "Invalid credentials",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User does not exist, please signup",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/reset-email-verify", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);

    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ email: req.body.email })
      .toArray();
    if (user.length === 1) {
      let digits = "123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 9)];
      }
      if (OTP) {
        let saveOtp = await Db.collection(
          process.env.DB_COLLECTION_ONE
        ).findOneAndUpdate(
          { _id: ObjectId(user[0]._id) },
          { $push: { otp: OTP } }
        );
        if (saveOtp) {
          await mailer(req.body.email, OTP);
          res.json({
            statusCode: 200,
            message: "OTP has sent successful",
          });
        } else {
          res.json({
            statusCode: 402,
            message: "Otp generation failed",
          });
        }
      } else {
        res.json({
          statusCode: 403,
          message: "Otp generation failed",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User does not exist, Do register...",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.post("/reset-otp-verify", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let user = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ email: req.body.user })
      .toArray();
    if (user) {
      let verify = user[0].otp.includes(req.body.data.otp);
      if (verify) {
        res.json({
          statusCode: 200,
          message: "Verification successful. Wait...",
          userId: user[0]._id,
        });
      } else {
        res.json({
          statusCode: 401,
          message: "invalid Otp",
        });
      }
    } else {
      res.json({
        statusCode: 402,
        message: "User does not exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.put("/password/reset/:id", async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let users = await Db.collection(process.env.DB_COLLECTION_ONE)
      .find({ _id: ObjectId(req.params.id) })
      .toArray();
    if (users) {
      if (req.body.password === req.body.confirmPassword) {
        let hashpassword = await hashPassword(req.body.password);

        if (hashpassword) {
          let users = await Db.collection(
            process.env.DB_COLLECTION_ONE
          ).findOneAndUpdate(
            { _id: ObjectId(req.params.id) },
            { $set: { password: hashpassword } }
          );
          if (users) {
            res.json({
              statusCode: 200,
              message: "Password changed successfully",
            });
          }
        }
      } else {
        res.json({
          statusCode: 403,
          message: "Details does not match",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "Time expired, Retry...",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});
app.delete("/delete-post/:id", authentication, async (req, res) => {
  await Client.connect();
  try {
    const Db = Client.db(process.env.DB_NAME);
    let deleteOne = await Db.collection(
      process.env.DB_COLLECTION_TWO
    ).deleteOne({ _id: ObjectId(req.params.id) });
    if (deleteOne) {
      res.json({
        statusCode: 200,
        message: "Post deleted",
      });
    } else {
      res.json({
        statusCode: 401,
        message: "Process failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    await Client.close();
  }
});

app.post("/new-movie", async (req, res) => {
  // await Client.connect();
  try {
    console.log(req.body);
    const result = await uploadFile(req.body.Movie, req.body.Name);
    console.log(result);
    // const Db = Client.db(process.env.DB_NAME);
    // let users = await Db.collection(process.env.DB_COLLECTION_ONE)
    //   .find({ username: req.headers.username })
    //   .toArray();
    // console.log(req.body);
    // console.log(result);
    // const updateData = {
    //   Caption: req.body.Caption,
    //   Location: req.body.Location,
    //   Tags: req.body.Tags,
    //   Image: process.env.AWS_CLOUDFRONT_KEY + result.Key,
    //   Time: req.body.Time,
    //   Author: { username: users[0].username, profilePic: users[0].profilePic },
    //   Likes: [],
    //   Saved: [],
    //   Comments: [],
    // };

    // let post = await Db.collection(process.env.DB_COLLECTION_TWO).insertOne(
    //   req.body.Movie
    // );
    // console.log(post);
    if (result) {
      res.json({
        statusCode: 200,
        message: "upload successful",
      });
    } else {
      res.json({
        statusCode: 401,
        message: "upload failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  }
  // finally {
  //   await Client.close();
  // }
});

app.listen(PORT, () => {
  console.log("Server running into port " + PORT);
});
