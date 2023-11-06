const content = [
  {
    id: "course0",
    title:
      "Introduction to memes",
    instructor: "zoned out cat",
    description: "Learn the basics of memeology",
    enrollementStatus: "open", // .... this if open check for the student -> conditional render in progress |
    duration: "2 weeks",
    loc: "online",
    requisites: ["basics of memes", "cat meme enoyer"],
    syllabus: [
      {
        week1: 1,
        topic: "memes",
        content: "overview of memes",
      }
    ],
    students: [
      {
        id: 1,
        name: "cat dog",
        email: "woof@woof"
      }
    ]

  },
];

const comments = [{
  commenterId:"123",
  commenterName:"oof",
  commentContent:"oof oof"
  
}]

const likes = [{
  likerId:"123",
  likerName:"oof",
  
}]

export { content };
