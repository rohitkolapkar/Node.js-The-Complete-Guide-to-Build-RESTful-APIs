const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:{
    type:[authorSchema]
  }
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function addAuthor(courseId,author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();

}

async function removeAuthor(courseId,authorId){
  const course = await Course.findById(courseId);
  const author=course.authors.id(authorId);
  author.remove();
  course.save();

}

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Rohit' }),
//   new Author({ name: 'ABC' })

// ]);

//listCourses();

//addAuthor('5c860b8c81b03317d4ef68aa',new Author({name:'XYZ'}));
removeAuthor('5c860b8c81b03317d4ef68aa','5c872c64b962e210a0c57a1f');