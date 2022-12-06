import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

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

//
  app.get("/filteredimage",async (req: Request, res: Response) => {
    let image_url = req.query.image_url.toString()

    //If image url is not given by the client
    if (!image_url){
      res.status(400).send("Image URL is required");
    }

   try {

    const filteredImage =  await filterImageFromURL(image_url);

    //send filtered image and delete any localfile
    res.status(200).sendFile(filteredImage, () => {
      deleteLocalFiles([filteredImage])
    });
    
   } catch (error) {
    res.send(error)
   }

  
    
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