const Movie = require('../models/movieModel');
const Cast = require('../models/casteModel');

const multer = require('multer');
const casteModel = require('../models/casteModel');


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './upload'); 
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'movie-';
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename); // Set the filename to be unique
  }
});


const upload = multer({ storage: storage }).fields([
  { name: 'movieImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'trailer', maxCount: 1 }
]);
const uploadCaste = multer({ storage: storage }).fields([
    { name: 'casts[0][castImage]' },
    { name: 'casts[1][castImage]' }, // Adjust for the number of expected images dynamically
]);
// Create new Movie
const createMovie = async (req, res) => {
    const { movieName, language, screenType, startDate, endDate, movieType, duration, description } = req.body;
  
    // Handle files for movie and trailer
    const movieImage = req.files['movieImage'][0]
    const coverImage = req.files['coverImage'][0]
    const trailer = req.files['trailer'][0]
  
   
  
   
    try {
      // Create movie with cast and other details
      const newMovie = new Movie({
        movieName,
        movieImage,
        coverImage,
        language,
        screenType,
        startDate,
        endDate,
        movieType,
        screenId,
        duration,
        trailer,
        description,
      });
  
      await newMovie.save();
      return res.status(200).json({status:200, msg: 'Movie created successfully', data: newMovie });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status:500,msg: 'Failed to create movie', error: error.message });
    }
  };
  
  const createCast= async (req, res) => {
   const { casts } = req.body;
  console.log('in cast');
  
   
    console.log(req.files);
    console.log('Received cast data:', casts);


try{
    const cast= casts.map((item, index) => {
        return {
            movieId:req.params.id,
            castName: item.castName,
            role: item.role,
            castImage: req.files[`casts[${index}][castImage]`], // Path to the uploaded file
        };
    });

    console.log('Parsed cast array:', cast);

    // Insert data into MongoDB (assuming a Mongoose model named `Cast`)
    const insertedCasts = await Cast.insertMany(cast);

    // Respond with success
    res.status(201).json({status:200, success: true, data: insertedCasts });
} catch (error) {
    console.error('Error creating cast:', error);
    res.status(500).json({status:500, success: false, message: error.message });
}
 
  };
  const updateCast= async (req, res) => {
    const { casts } = req.body;
   console.log('in cast');
   
    
     console.log(req.files);
     console.log('Received cast data:', casts);
 
 
 try{
     const cast= casts.map((item, index) => {
      const updatedMovie = Cast.updateMany(
        {movieId:req.params.id},
        {
        
             
             castName: item.castName,
             role: item.role,
             castImage: req.files[`casts[${index}][castImage]`], // Path to the uploaded file
         }
     )
    })
     console.log('Parsed cast array:', cast);
 
     
     // Respond with success
     res.status(201).json({status:200, success: true, data: insertedCasts });
 } catch (error) {
     console.error('Error creating cast:', error);
     res.status(500).json({status:500, success: false, message: error.message });
 }
  
   };
 
// Update Movie by ID
const updateMovieById = async (req, res) => {
  const movieId = req.params.id;
console.log("her",movieId,req.body);

  const { movieName, language, screenType, startDate, endDate, movieType, duration, description } = req.body;
  const movieImage = req.files?.['movieImage']?.[0] || null;
  const coverImage = req.files?.['coverImage']?.[0] || null;
  const trailer = req.files?.['trailer']?.[0] || null;

  try {
    // Find the existing movie
    const existingMovie = await Movie.findById(movieId);

    if (!existingMovie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    // Update only if new data is provided, otherwise retain the previous values
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        movieName,
        movieImage: movieImage || existingMovie.movieImage,
        coverImage: coverImage || existingMovie.coverImage, 
        language,
        screenType,
        startDate,
        endDate,
        movieType,
        duration,
        trailer: trailer || existingMovie.trailer,
        description,
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({ msg: 'Movie updated successfully', data: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Failed to update movie', error: error.message });
  }
};


// View Movie by ID
const viewMovieById = (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .exec()
    .then(movie => {
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
      return res.status(200).json({ msg: 'Movie details', data: movie });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ msg: 'Error fetching movie', error: err.message });
    });
};
const viewCastByMovieId = (req, res) => {
  const movieId = req.params.id;
console.log(movieId);

  casteModel.find({movieId:movieId})
    .exec()
    .then(movie => {
      console.log(movie);
      
      return res.status(200).json({ msg: 'Movie details', data: movie });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ msg: 'Error fetching movie', error: err.message });
    });
};
// View all Movies
const viewAllMovies = (req, res) => {
  Movie.find()
    .exec()
    .then(movies => {
      return res.status(200).json({ msg: 'Movies list', data: movies });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ msg: 'Failed to fetch movies', error: err.message });
    });
};

// Delete Movie by ID
const deleteMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    return res.status(200).json({ msg: 'Movie deleted successfully', data: deletedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Failed to delete movie', error: error.message });
  }
};

// Activate Movie by ID
const activateMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { isActive: true },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    return res.status(200).json({ msg: 'Movie activated successfully', data: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Failed to activate movie', error: error.message });
  }
};

// Deactivate Movie by ID
const deactivateMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      { isActive: false },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    return res.status(200).json({ msg: 'Movie deactivated successfully', data: updatedMovie });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Failed to deactivate movie', error: error.message });
  }
};

const nowShowingMovies = (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of today

  Movie.find({})
    .exec()
    .then((movies) => {
      console.log("Movies from DB:", movies);
      console.log("Today:", today);

      if (!movies.length) {
        return res.status(404).json({ msg: 'No movies are currently showing', data: [] });
      } else {
        // Filter movies that have started and are still running
        const nowShowing = movies.filter((movie) => {
          const startDate = new Date(movie.startDate); // Convert startDate to Date
          const endDate = new Date(movie.endDate);     // Convert endDate to Date

          // Check if the movie is currently showing
          return startDate <= today && endDate >= today;
        });

        if (!nowShowing.length) {
          return res.status(404).json({ msg: 'No movies are currently showing', data: [] });
        }

        return res.status(200).json({ msg: 'Now showing movies', data: nowShowing });
      }
    })
    .catch((err) => {
      console.error('Error fetching movies:', err);
      return res.status(500).json({ msg: 'Failed to fetch movies', error: err.message });
    });
};



const comingSoonMovies = (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of today

  Movie.find({})
    .exec()
    .then((movies) => {
      console.log("Movies from DB:", movies);
      console.log("Today:", today);

      if (!movies.length) {
        return res.status(404).json({ msg: 'No upcoming movies found', data: [] });
      } else {
        // Filter movies with a startDate greater than today
        const upcomingMovies = movies.filter((movie) => {
          const movieDate = new Date(movie.startDate); // Ensure it's a Date object
          console.log("Movie Date:", movieDate);

          return movieDate > today; // Check if movieDate is in the future
        });

        if (!upcomingMovies.length) {
          return res.status(404).json({ msg: 'No upcoming movies found', data: [] });
        }

        return res.status(200).json({ msg: 'Upcoming movies', data: upcomingMovies });
      }
    })
    .catch((err) => {
      console.error('Error fetching movies:', err);
      return res.status(500).json({ msg: 'Failed to fetch movies', error: err.message });
    });
};


module.exports = {
  createMovie,
  updateMovieById,
  viewMovieById,
  viewAllMovies,
  deleteMovieById,
  activateMovieById,
  upload,
  uploadCaste,
  deactivateMovieById,
  createCast,
  viewCastByMovieId,
  updateCast,
  comingSoonMovies,
    nowShowingMovies
};
