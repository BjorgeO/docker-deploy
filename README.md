# Huldra: A Framework for Collecting Crowdsourced Feedback on Multimedia Assets

Collecting crowdsourced feedback to evaluate, rank, or score multimedia content can be cumbersome and time consuming. Most of the existing survey tools are complicated, hard to customize, or tailored for a specific asset type. In this repository, we present an open source framework called Huldra, designed explicitly to address the challenges associated with user studies involving crowdsourced feedback collection. The web-based framework is built in a modular and configurable fashion to allow for the easy adjustment of the user interface (UI) and the multimedia content, while providing integrations with reliable and stable backend solutions to facilitate the collection and analysis of responses.
Our proposed framework can be used as an online survey tool by researchers working on different topics such as Machine Learning (ML), audio, image, and video quality assessment, Quality of Experience (QoE), and require user studies for the benchmarking of various types of multimedia content.

Example use-cases of Huldra include [HOST-XAI](https://host-xai.herokuapp.com), a survey for the collection of feedback from medical experts about how they perceive different eXplainable Artificial Intelligence (XAI) methods demonstrated on images from the gastrointestinal (GI) tract, and [HOST-ATS](https://host-ats.herokuapp.com), a survey for the collection of feedback from the general public about how they perceive alternative thumbnails for a given soccer video clip, both of which use customized versions of Huldra.

## How to deploy from scratch

### 1. Set up a Firebase project

Currenty Huldra uses Google Firebase to store assets and responses (we may support other types of storage solutions in the future).

- Login to https://firebase.google.com/ with your Google account.
- Click **Go to console**.
- Click **+ Add project** and follow the prompts to create a project.
- Click the **</>** icon to create a web app.
- Once the web app is created, the project configuration page will be opened automatically. Here you can see Firebase connection parameters such as `apiKey` and `appId`. Save these for later use. (If you forget, you can find this info under **Project Overview** -> **Project settings** -> **General**.)
 - In your project, go to **All Products** -> **Authentication**. On the **Sign-in Methods** page, enable the **Anonymous** sign-in method

### 2. Upload assets

Huldra uses assets in Firebase Storage to automatically generate survey pages.

- In Firebase console, find **Storage** in **All Products**.
- You can create folders in your storage bucket. Huldra reads assets from the `gallery` folder by default, so upload your assets (images, audio and/or video clips) in this folder.

See [Assets](#assets) below for details about assets.

### 3. Run on your local computer

You need to have [Node.js](https://nodejs.org/) installed on your computer.

- Clone or download the source code of Huldra.
- Inside the folder of the source (where `package.json` is located), run `npm install`.
- Create a file named `.env` in the same folder as `package.json`. The content of the file should be in the following format:

````
REACT_APP_FIREBASE_API_KEY="Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp4B8AgT@n!6*p@Hmp"
REACT_APP_FIREBASE_AUTH_DOMAIN="foobar.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="foobar"
REACT_APP_FIREBASE_STORAGE_BUCKET="foobar.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1234567890"
REACT_APP_FIREBASE_APP_ID="Hmp4B8AgT@n!6*p@"
REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"
````

Don't use the values given as examples above because they are only dummy content. You should replace them with the Firebase connection parameters you get in the last step of **Set up a Firebase project**.

For `REACT_APP_FIREBASE_ROOT_DIRECTORY` you can choose whatever directory you like. Just make sure that your `gallery` folder is under it. For instance, if your folder structure is `/dev/gallery`, you should put `REACT_APP_FIREBASE_ROOT_DIRECTORY="/dev"` in the file. Don't forget to place a forward slash at the start of the path.

- Run `npm start` and wait a little while. Then you should see your browser opens Huldra at http://localhost:3000/ in development mode. Enjoy!

### 4. Deploy to a server

You can delopy Huldra to servers that support Node.js, such as [Heroku](https://heroku.com/), [Netlify](https://www.netlify.com/) or [GitHub Pages](https://pages.github.com/).

For Heroku, you can set Firebase connection parameters in the Heroku interface as config vars for your app (from the project page: **Settings** -> **Config Vars**). See [Heroku's documantation](https://devcenter.heroku.com/articles/github-integration) if you need help on how to deploy to Heroku from GitHub.

For Netlify, you can set variables under **Site settings** -> **Build & deploy** -> **Environment** -> **Environment variables**.

For GitHub Pages, go to your repository's **Setting** -> **Secrets** to enter the Firebase connection parameters.

## Other issues about deployment
### CORS error messages from Firabase
You can change Firebase settings to suit your needs.

If you see CORS error messages from Firabase in the console, that means you must [configure your Cloud Storage bucket for cross-origin access (CORS)](https://firebase.google.com/docs/storage/web/download-files#cors_configuration). Here is a guide on how to do it: https://stackoverflow.com/a/71193349/802678

# More About Huldra

## Configuration
You can customize your instance by changing configuration parameters in the `.env` file or the `config.json` file. `.env` takes precedence over `config.json`.

When you deploy to a server such as Heroku, you can specify configuration parameters through the Heroku interface (see **Deploy to a server** for more), which also takes precedence over `config.json`. This can be useful if you want to customize your instance without changing any code.

### Color scheme
Add the following to `src/config.json` to specify a color scheme.

```
  "REACT_APP_color": {
    "themeColor" : "green"
  },
```

Supported values are: `green`, `purple`, `yellow`, `teal`, and `orange`.

If no color is specified, the default color is blue.

The values of the colors are:

- default blue: $\color{#38c3f2}{■}$ (#38c3f2)
- green: $\color{#6db784}{■}$ (#6db784);
- purple: $\color{#9b45b2}{■}$ (#9b45b2);
- yellow: $\color{#f9e45b}{■}$ (#f9e45b);
- teal: $\color{#2b6777}{■}$ (#2b6777);
- orange: $\color{#eb6b40}{■}$ (#eb6b40);

## Assets

### Overview
Set up the folder structure in your Firebase storage bucket, prepare and upload the multimedia assets corresponding to your desired cases.

If `cases` is set in `config.json` under `REACT_APP_caseOrder`, the app uses these cases;
if empty, the app fetches all cases from Firebase.

`"shuffle": "categorized"`: the order of the cases is shuffled within each media type, but the order of the types is hardcoded (image, hybrid, video, and audio)
`"shuffle": "full"`: all the cases are shuffled

If you changed case order, sometimes you have to restart the browser or clear the local storage for it to take effect.

### Naming convention
The assets have to adhere to the following naming convention:

- Folder: `<type>-<label>`
- Main asset: `<type>-<label>.<extension>`
- Option A: `<type>-<label>-a.<extension>`
- Option B: `<type>-<label>-b.<extension>`

`<type>` has to be one of the following: `audio`, `video`, `image`, and `hybrid`.

### Directories Tree

```
gallery
└───cases
│   └───audio-lorem
|       └───audio-lorem-a.mp3
|       └───audio-lorem-b.mp3
│   └───video-ipsum
|       └───video-ipsum-a.mp4
|       └───video-ipsum-b.mp4
│   └───hybrid-amet
|       └───hybrid-amet.mp4
|       └───hybrid-amet-a.jpeg
|       └───hybrid-amet-b.jpeg
│   └───image-sit
|       └───image-sit.jpeg
|       └───image-sit-a.jpeg
|       └───image-sit-b.jpeg
|       └───image-sit.json
```

For an image case, a json file is also necessary. An image case needs 4 files minimum.

### Supported File Extensions

| Audio Format | Support |
| ------------- | ------------- |
| `AAC`  | ✅   |
| `AIFF`  | ❌  |
| `FLAC`  | ✅   |
| `MP3`  | ✅   |
| `OGG`  | ✅   |
| `WAW`  | ✅   |
| `WMA`  | ❌  |

| Video Format | Support |
| ------------- | ------------- |
| `AVI`  | ❌  |
| `FLV`  | ❌  |
| `MKV`  | ❌  |
| `MOV`  | ✅   |
| `MP4`  | ✅   |
| `WEBM`  | ✅   |
| `WMV`  | ❌  |

| Image Format | Support |
| ------------- | ------------- |
| `JPEG`  | ✅   |
| `PNG`  | ✅  |

## Outputs

You can retrieve participant response files from your Firebase storage bucket (`<root directory>` -> `responses`) at your convenience.

## References
* [Huldra: a framework for collecting crowdsourced feedback on multimedia assets](https://dl.acm.org/doi/abs/10.1145/3524273.3532887)
* [Automatic thumbnail selection for soccer videos using machine learning](https://dl.acm.org/doi/abs/10.1145/3524273.3528182)
* [HOST-ATS: automatic thumbnail selection with dashboard-controlled ML pipeline and dynamic user survey](https://dl.acm.org/doi/abs/10.1145/3524273.3532908)
* [Visual explanations for polyp detection: How medical doctors assess intrinsic versus extrinsic explanations
](https://arxiv.org/abs/2204.00617)

 ## Citation
 If you find our work useful for your research, please include the following citation:
```
@inproceedings{Hammou2022,
  doi = {10.1145/3524273.3532887},
  url = {https://doi.org/10.1145/3524273.3532887},
  year = {2022},
  month = jun,
  publisher = {{ACM}},
  author = {Malek Hammou and Cise Midoglu and Steven A. Hicks and Andrea Stor{\aa}s and Saeed Shafiee Sabet and Inga Str\"{u}mke and Michael A. Riegler and P{\aa}l Halvorsen},
  title = {Huldra},
  booktitle = {Proceedings of the 13th {ACM} Multimedia Systems Conference}
}
```

## Internal only
### Keyboard shortcuts
`Enter`: imitates the press of the Next button, with all its requirements where applicable (e.g., if the cases need to be viewed before the button can be pressed, `Enter` also doesn't work until then)

`Shift + Enter`: forcefully skip to the next page (also possible to skip to the next case without answering the current one)

`Shift + F`: on the registration page which opens after clicking `Get participant ID`, automatically fill out the form and make the "Start Survey" button clickable (applicable fields are filled with the string "NA", in order to facilitate the filtering of such development/test/debug responses from Firebase later on)
