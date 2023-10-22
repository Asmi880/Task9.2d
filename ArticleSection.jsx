import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { v4 } from 'uuid';
import { imageDb, firestoreDb } from './firebase';
import './ArticleSection.css';

function ArticleSection() {
  const [title, setTitle] = React.useState('');
  const [abstract1, setAbstract1] = React.useState('');
  const [abstract2, setAbstract2] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [img, setImg] = React.useState(null);
  const [imgFileName, setImgFileName] = React.useState('');

  const handlePost = async () => {
    try {
      // Create a new document in Firestore collection
      const docRef = await addDoc(collection(firestoreDb, 'articles'), {
        Title: title,
        Abstract1: abstract1,
        Abstract2: abstract2,
        Tags: tags,
        // Add other fields as needed
      });
      console.log('Document written with ID:', docRef.id);

      // Upload the image and get the download URL
      if (img) {
        const imgRef = ref(imageDb, `images/${v4()}`);
        const uploadTask = uploadBytesResumable(imgRef, img);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // You can monitor the upload progress here
          },
          (error) => {
            console.error('Error uploading image:', error);
            // Provide user-friendly error feedback if needed
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('Image uploaded:', downloadURL);

              // Update the Firestore document with the image URL
              await updateDoc(doc(firestoreDb, 'articles', docRef.id), {
                ImageURL: downloadURL,
              });

              console.log('Image URL added to Firestore document.');

              // Optionally, reset the form or perform any other necessary actions.
              // For example, you can clear input fields after posting.

            } catch (error) {
              console.error('Error getting download URL:', error);
            }
          }
        );
      }
    } catch (error) {
      console.error('Error adding document:', error);
      // Provide user-friendly error feedback if needed
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImgFileName(file.name); // Set the selected file name
  };

  const handleUpload = () => {
    if (img) {
      const imgRef = ref(imageDb, `images/${v4()}`);
      const uploadTask = uploadBytesResumable(imgRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // You can monitor the upload progress here
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Provide user-friendly error feedback if needed
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Image uploaded:', downloadURL);

            // Now, you can store the downloadURL in the Firestore document or perform other actions.
          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      );
    }
  };

  return (
    <div className="questionSection">
      <label className="questionLabel">What do you want to ask or share</label>
      <div className="input-container">
        <label className="Title-label">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter a descriptive title"
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
      </div>
      <div className="input-container">
        <label className="Title-label">Add an image:</label>
        <input type="file" id="image" onChange={handleImageChange} />
        <input
          type="text"
          className="selected-file-input"
          value={imgFileName}
          readOnly
        />
        <div className="button-container">
          <label htmlFor="image" className="title-button" id="browseButton">
            Browse
          </label>
          <br />
          <button className="title-button" id="uploadButton" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
      <hr />
      <label className="abstract-label">Abstract</label>
      <textarea
        id="problem-1"
        className="abstract-input"
        placeholder="Enter a 1-paragraph abstract"
        rows="7"
        onChange={(e) => setAbstract1(e.target.value)}
      />
      <hr />
      <label className="abstract-text-label">Abstract Text</label>
      <textarea
        id="problem-2"
        placeholder="Enter a 1-paragraph abstract"
        className="abstract-text-input"
        rows="7"
        onChange={(e) => setAbstract2(e.target.value)}
      />
      <hr />
      <div className="tags-area">
        <label className="tags">Tags</label>
        <input
          type="text"
          id="tags"
          placeholder="Please add up to 3 tags to describe what your question is about e.g., Java"
          className="tags-input"
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button className="post-button" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default ArticleSection;

