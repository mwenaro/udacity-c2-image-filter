import express from 'express';
import bodyParser from 'body-parser';
//import isImageURL from 'image-url-validator';

import {filterImageFromURL, deleteLocalFiles,isImageUrl} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
 app.get('/filteredimage', (req, res)=>{
	//retrieving and validationg the passed image_url
	 //
	 const url:string = req.query.image_url as string;
	 const isValidImageUrl:boolean = isImageUrl(url); 

	 const files :string[] = [];

	 if(!isValidImageUrl){
		return res.status(400).json({message:"Invalid Image URL! Please try again"});
	}

	//
filterImageFromURL(url)
  .then(filtered_img_url=>{

	files.push(filtered_img_url);

      res.sendFile(filtered_img_url, async (err)=>{

	      if(err)
		      res.status(500).json({msg:"Internal Server Error. Try again"});
	  //delete img files from the tmp directory
	      await deleteLocalFiles(files);

      });

})
.catch(err => res.json({msg:err}));
	


  });
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
