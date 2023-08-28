[<img width="250" alt="ImageKit.io" src="https://raw.githubusercontent.com/imagekit-developer/imagekit-javascript/master/assets/imagekit-light-logo.svg"/>](https://imagekit.io)

# ImageKit.io React SDK

[![Node CI](https://github.com/imagekit-developer/imagekit-react/workflows/Node%20CI/badge.svg)](https://github.com/imagekit-developer/imagekit-react/)
[![npm version](https://img.shields.io/npm/v/imagekitio-react)](https://www.npmjs.com/package/imagekitio-react)
[![codecov](https://codecov.io/gh/imagekit-developer/imagekit-react/branch/master/graph/badge.svg)](https://codecov.io/gh/imagekit-developer/imagekit-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter Follow](https://img.shields.io/twitter/follow/imagekitio?label=Follow&style=social)](https://twitter.com/ImagekitIo)

ImageKit React SDK allows you to resize, optimize, deliver and upload images and videos in your react application.

ImageKit is a complete media storage, optimization, and transformation solution that comes with an image and video CDN. It can be integrated with your existing infrastructure - storage like AWS S3, web servers, your CDN, and custom domain names, allowing you to deliver optimized images in minutes with minimal code changes.

## Installation

```shell
npm install --save imagekitio-react
```

or

```shell
yarn add imagekitio-react
```

## Usage

### Initialization

Import components in your code:

```js
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'
```

### Quick examples

```js
<IKContext urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
  // Render an image using a relative path - https://ik.imagekit.io/your_imagekit_id/default-image.jpg
  <IKImage path="/default-image.jpg" />

  // Overriding urlEndpoint defined in parent IkContext - https://www.custom-domain.com/default-image.jpg
  <IKImage urlEndpoint="https://www.custom-domain.com" path="/default-image.jpg" />

  // Render an image using an absolute URL - https://www1.custom-domain.com/default-image.jpg?tr=w-100
  <IKImage src="https://www1.custom-domain.com/default-image.jpg?tr=w-100" />

  // Height and width manipulation - https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200/default-image.jpg
  <IKImage path="/default-image.jpg" transformation={[{
    "height": "200",
    "width": "200"
  }]} />

  // Chained transformation - https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200:rt-90/default-image.jpg
  <IKImage path="/default-image.jpg" transformation={[{
    "height": "200",
    "width": "200",
  },
  {
    "rotation": "90"
  }]} />

  // Lazy loading image
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    loading="lazy"
  />

  /*
     Low-quality image placeholder
     Will first load https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200:q-20,bl-6/default-image.jpg, while the original image, i.e., https://ik.imagekit.io/your_imagekit_id/tr:h-200,w-200/default-image.jpg is being loaded in the background.
  */
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    lqip={{ active: true }}
  />

  // Low-quality image placeholder with custom quality and blur values
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    lqip={{ active: true, quality: 20, blur: 10 }}
  />

  // Low-quality image placeholder and lazy loading original image in the background
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      "height": "200",
      "width": "200"
    }]}
    loading="lazy"
    lqip={{ active: true }}
  />

  // Video element with basic transformation, reduced quality by 50% using q:50
  <IKVideo
    path={'/default-video.mp4'}
    transformation={[{ height: 200, width: 200, q: 50 }]}
    controls={true}
  />
</IKContext>

<IKContext publicKey="your_public_api_key" authenticationEndpoint="https://www.your-server.com/auth">
  // Simple file upload and response handling
  <IKUpload
    onError={onError}
    onSuccess={onSuccess}
  />

  // Passing different upload API options
  <IKUpload
    fileName="file-name.jpg"
    tags={["sample-tag1", "sample-tag2"]}
    customCoordinates={"10,10,10,10"}
    isPrivateFile={false}
    useUniqueFileName={true}
    responseFields={["tags"]}
    folder={"/sample-folder"}
    inputRef={uploadRef}
    onError={onError} onSuccess={onSuccess}
  />
</IKContext>
```

## Demo application
* The official step-by-step React quick start guide - https://docs.imagekit.io/getting-started/quickstart-guides/react
* The official step-by-step React Native quick start guide - https://docs.imagekit.io/getting-started/quickstart-guides/react-native

## Components

The library includes 5 Components:

* [`IKContext`](#IKContext) for defining options like `urlEndpoint`, `publicKey` or `authenticationEndpoint` to all children elements. This component does not render anything.
* `IKImage` for [image resizing](#image-resizing). This renders a `<img>` tag.
* `IKVideo` for [video resizing](#video-resizing). This renders a `<video>` tag.
* `IKUpload`for client-side [file uploading](#file-upload). This renders a `<input type="file">` tag.
* `IKCore` for [Core SDK](#ikcore), This exposes methods from [ImageKit javascript SDK](https://github.com/imagekit-developer/imagekit-javascript) like url and upload.

## IKContext

To use this SDK, you need to provide it with a few configuration parameters. You can use a parent `IKContext` component to define common options for all children `IKImage`, `IKVideo` or `IKupload` components. For example:

```js
<IKContext
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"  // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey="your_public_api_key" // optional
  transformationPosition="path" // optional
  authenticationEndpoint="http://www.yourserver.com/auth"> // optional
  <IKImage path="/default-image.jpg" />
</IKContext>
```

will render:

```html
<img alt="" src="https://ik.imagekit.io/your_imagekit_id/default-image.jpg">
```

* `urlEndpoint` is required to use the SDK. You can get URL-endpoint from your ImageKit dashboard - https://imagekit.io/dashboard/url-endpoints.
* `publicKey` and `authenticationEndpoint` parameters are required if you want to use the SDK for client-side file upload. You can get these parameters from the developer section in your ImageKit dashboard - https://imagekit.io/dashboard/developer/api-keys.
* `transformationPosition` is optional. The default value for this parameter is `path`. Acceptable values are `path` & `query`

> Note: Do not include your [private key](https://docs.imagekit.io/api-reference/api-introduction/api-keys#private-key) in any client-side code.

## Image resizing

The `IKImage` component renders an `img` tag. It is used for rendering and manipulating images in real time. `IKImage` component accepts the following props:

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| urlEndpoint      | String | Optional. The base URL to be appended before the path of the image. If not specified, the URL-endpoint specified in the parent `IKContext` component is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | String |Conditional. This is the path at which the image exists. For example, `/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| src              | String |Conditional. This is the complete URL of an image already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/image.jpg`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| transformation   | Array of objects |Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name and the value should be specified as a key-value pair in the object. See list of [different tranformations](#list-of-supported-transformations). Different steps of a [chained transformation](https://docs.imagekit.io/features/image-transformations/chained-transformations) can be specified as the Array's different objects. The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it is applied in the URL as it is. |
| transformationPosition | String |Optional. The default value is `path`, which places the transformation string as a URL path parameter. It can also be specified as `query`, which adds the transformation string as the URL's query parameter i.e.`tr`. If you use the `src` parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Object |Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and are not necessarily related to ImageKit. Especially useful if you want to add some versioning parameters to your URLs. |
| loading  | String |Optional. Pass `lazy` to lazy load images. Note: Component does not accept change in this value after it has mounted. |
| lqip  | Object |Optional. You can use this to show a low-quality blurred placeholder while the original image is being loaded e.g. `{active:true, quality: 20, blur: 6, raw: "n-lqip_named_transformation"`}. The default value of `quality` is `20`, and `blur` is `6`. If `raw` transformation is provided, SDK uses that and ignores the `quality` and `blur` parameters. <br /> Note: Component does not accept change in this value after it has mounted.|

### Basic resizing examples

```js
<IKContext urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
  // Image from related file path with no transformations - https://ik.imagekit.io/your_imagekit_id/default-image.jpg
  <IKImage
    path="/default-image.jpg"
  />

  // Image resizing - https://ik.imagekit.io/your_imagekit_id/tr:w-h-300,w-400/default-image.jpg
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      height:300,
      width:400
    }]}
  />

  // Loading image from an absolute file path with no transformations - https://www.custom-domain.com/default-image.jpg
  <IKImage
    src="https://www.custom-domain.com/default-image.jpg"
  />

  // Using a new transformation parameter which is not there in this SDK yet - https://ik.imagekit.io/your_imagekit_id/tr:custom-value/default-image.jpg
  <IKImage
    path="/default-image.jpg"
    transformation={[{
      custom: 'value'
    }]}
  />
</IKContext>
```

The `transformation` prop is an array of objects. Each object can have the following properties. When you specify more than one object, each object is added as a chained transformation. For example:

```js
// It means first resize the image to 400x400 and then rotate 90 degree
transformation = [
  {
    height: 400,
    width: 400
  },
  {
    rotation: 90
  }
]
```

See the complete list of transformations supported in ImageKit [here](https://docs.imagekit.io/features/image-transformations). The SDK gives a name to each transformation parameter e.g. `height` for `h` and `width` for `w` parameter. It makes your code more readable. If the property does not match any of the following supported options, it is added as it is.

### List of supported transformations
<details>
<summary>Expand</summary>

| Supported Transformation Name | Translates to parameter |
|-------------------------------|-------------------------|
| height | h |
| width | w |
| aspectRatio | ar |
| quality | q |
| crop | c |
| cropMode | cm |
| x | x |
| y | y |
| focus | fo |
| format | f |
| radius | r |
| background | bg |
| border | b |
| rotation | rt |
| blur | bl |
| named | n |
| overlayX | ox |
| overlayY | oy |
| overlayFocus | ofo |
| overlayHeight | oh |
| overlayWidth | ow |
| overlayImage | oi |
| overlayImageTrim | oit |
| overlayImageAspectRatio | oiar |
| overlayImageBackground | oibg |
| overlayImageBorder | oib |
| overlayImageDPR | oidpr |
| overlayImageQuality | oiq |
| overlayImageCropping | oic |
| overlayImageTrim | oit |
| overlayText | ot |
| overlayTextFontSize | ots |
| overlayTextFontFamily | otf |
| overlayTextColor | otc |
| overlayTextTransparency | oa |
| overlayAlpha | oa |
| overlayTextTypography | ott |
| overlayBackground | obg |
| overlayTextEncoded | ote |
| overlayTextWidth | otw |
| overlayTextBackground | otbg |
| overlayTextPadding | otp |
| overlayTextInnerAlignment | otia |
| overlayRadius | or |
| progressive | pr |
| lossless | lo |
| trim | t |
| metadata | md |
| colorProfile | cp |
| defaultImage | di |
| dpr | dpr |
| effectSharpen | e-sharpen |
| effectUSM | e-usm |
| effectContrast | e-contrast |
| effectGray | e-grayscale |
| original | orig |
| raw | The string provided in raw will be added to the URL as it is. |

</details>

### Chained Transforms

Chained transforms make it easy to specify the order the transform is applied. For example:

```js
// Using chained transformation. First, resize and then rotate the image to 90 degrees.
<IKImage
  path="/default-image.jpg"
  transformation={[
    {
      height: 300,
      width: 400
    },
    {
      rotation: 90
    }
  ]}
/>
```

### Lazy loading images

You can lazy load images using the `loading` prop. When you use `loading="lazy"`, all images that are immediately viewable without scrolling load normally. Those far below the device viewport are only fetched when the user scrolls near them.

The SDK uses a fixed threshold based on the effective connection type to ensure that images are loaded early enough so that they have finished loading once the user scrolls near to them.

On fast connections (e.g 4G), the value of threshold is `1250px` and on slower connections (e.g 3G), it is `2500px`.

> You should always set the `height` and `width` of the image element to avoid [layout shift](https://www.youtube.com/watch?v=4-d_SoCHeWE) when lazy-loading images.

Example usage:

```js
// Lazy loading images
<IKImage
  path="/default-image.jpg"
  transformation={[
    {
      height:300,
      width:400
    },
    {
      rotation:90
    }
  ]}
  loading="lazy"
  height="300"
  width="400"
/>
```

### Low-quality image placeholders (LQIP)
To improve user experience, you can use a low-quality blurred variant of the original image as a placeholder while the original image is being loaded in the background. Once the loading of the original image is finished, the placeholder is replaced with the original image.

```js
// Loading a blurred low quality image placeholder while the original image is being loaded
<IKImage
  path="/default-image.jpg"
  lqip={{active:true}}
/>
```

By default, the SDK uses the `quality:20` and `blur:6`. You can change this. For example:

```js
<IKImage
  path="/default-image.jpg"
  lqip={{active:true, quality: 40, blur: 5}}
/>
```

You can also specify a `raw` transformation if you want more control over the URL of the low-quality image placeholder. In this case, the SDK ignores `quality` and `blur` parameters.

```js
<IKImage
  path="/default-image.jpg"
  lqip={{active:true, raw: "n-lqip_named_transformation"}}
/>
```

### Combining lazy loading with low-quality placeholders
You have the option to lazy-load the original image only when the user scrolls near them. Until then, only a low-quality placeholder is loaded. This saves a lot of network bandwidth if the user never scrolls further down.

```js
// Loading a blurred low quality image placeholder and lazy-loading original when the user scrolls near them
<IKImage
  path="/default-image.jpg"
  transformation={[{height:300,width:400},{rotation:90}]}
  lqip={{active:true}}
  loading="lazy"
  height="300"
  width="400"
/>
```

### Overriding urlEndpoint for a particular image
You can use `urlEndpoint` prop in an individual `IKImage` to change url for that image. For example:
```js
<IKContext urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
  // Render an image using parent IKContext urlEndpont - https://ik.imagekit.io/your_imagekit_id/default-image.jpg
  <IKImage path="/default-image.jpg" />

  // Overriding urlEndpoint defined in parent IkContext - https://www.custom-domain.com/default-image.jpg
  <IKImage urlEndpoint="https://www.custom-domain.com" path="/default-image.jpg" />
</IKContext>
```

## Video resizing

The `IKVideo` component renders a `video` tag. It is used for rendering and manipulating videos in real-time. `IKVideo` component accepts the following props:

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| urlEndpoint      | String | Optional. The base URL to be appended before the path of the video. If not specified, the URL-endpoint specified in the parent `IKContext` component is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| path             | String |Conditional. This is the path at which the video exists. For example, `/path/to/video.mp4`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| src              | String |Conditional. This is the complete URL of a video already mapped to ImageKit. For example, `https://ik.imagekit.io/your_imagekit_id/endpoint/path/to/video.mp4`. Either the `path` or `src` parameter needs to be specified for URL generation. |
| transformation   | Array of objects |Optional. An array of objects specifying the transformation to be applied in the URL. The transformation name and the value should be specified as a key-value pair in the object. See list of [different tranformations](#list-of-supported-transformations). The complete list of supported transformations in the SDK and some examples of using them are given later. If you use a transformation name that is not specified in the SDK, it gets applied as it is in the URL. |
| transformationPosition | String |Optional. The default value is `path`, which places the transformation string as a path parameter in the URL. It can also be `query`, which adds the transformation string as the query parameter tr in the URL. If you use the src parameter to create the URL, then the transformation string is always added as a query parameter. |
| queryParameters  | Object |Optional. These are the other query parameters that you want to add to the final URL. These can be any query parameters and are not necessarily related to ImageKit. Especially useful if you want to add some versioning parameters to your URLs. |

### Basic video resizing examples

```js
<IKContext urlEndpoint="https://ik.imagekit.io/demo/your_imagekit_id">
  // Video from related file path with no transformations - https://ik.imagekit.io/demo/your_imagekit_id/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
  />
  // Video resizing - https://ik.imagekit.io/demo/your_imagekit_id/tr:w-h-300,w-400/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
    transformation={[{
      height:300,
      width:400
    }]}
  />
  // Loading video from an absolute file path with no transformations - https://www.custom-domain.com/default-video.mp4
  <IKVideo
    src="https://www.custom-domain.com/default-video.mp4"
  />
  // Using a new transformation parameter which is not there in this SDK yet - https://ik.imagekit.io/demo/your_imagekit_id/tr:custom-value/sample-video.mp4
  <IKVideo
    path="/sample-video.mp4"
    transformation={[{
      custom: 'value'
    }]}
  />
</IKContext>
```

The `transformation` prop is an array of objects. Each object can have the following properties.

```js
// It means first resize the video to 400x400 and then rotate 90 degree
transformation = [
  {
    height: 400,
    width: 400,
    rt: 90
  }
]
```

## File upload

The SDK provides the `IKUpload` component to upload files to the [ImageKit Media Library](https://docs.imagekit.io/media-library/overview). 

`IKUpload` component accepts the following props. These options are better explained in the [ImageKit Upload API](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#request-structure-multipart-form-data) documentation.

| Prop             | Type | Description                    |
| :----------------| :----|:----------------------------- |
| fileName | String | Optional. If not specified, the file system name is picked. 
| useUniqueFileName  | Boolean | Optional. Accepts `true` of `false`. The default value is `true`. Specify whether to use a unique filename for this file or not. |
| tags     | Array of string | Optional. Set the tags while uploading the file e.g. ["tag1","tag2"] |
| folder        | String | Optional. The folder path (e.g. `/images/folder/`) in which the file has to be uploaded. If the folder doesn't exist before, a new folder is created.|
| isPrivateFile | Boolean | Optional. Accepts `true` of `false`. The default value is `false`. Specify whether to mark the file as private or not. This is only relevant for image type files|
| customCoordinates   | String | Optional. Define an important area in the image. This is only relevant for image-type files. To be passed as a string with the `x` and `y` coordinates of the top-left corner and `width` and `height` of the area of interest in the format `x,y,width,height`. For example - `10,10,100,100` |
| responseFields   | Array of string | Optional. Values of the fields that you want upload API to return in the response. For example, set the value of this field to `["tags", "customCoordinates", "isPrivateFile"]` to get value of `tags`, `customCoordinates`, and `isPrivateFile` in the response. |
| extensions   | Array of object | Optional. Array of object for [applying extensions](https://docs.imagekit.io/extensions/overview) on the image. |
| webhookUrl   | String | Optional. Final status of pending extensions will be sent to this URL. |
| overwriteFile   | Boolean | Optional. Default is true. If overwriteFile is set to false and useUniqueFileName is also false, and a file already exists at the exact location, upload API will return an error immediately. |
| overwriteAITags   | Boolean | Optional. Default is true. If set to true and a file already exists at the exact location, its AITags will be removed. Set overwriteAITags to false to preserve AITags. |
| overwriteCustomMetadata   | Boolean | Optional. Default is true. If the request does not have customMetadata , overwriteCustomMetadata is set to true and a file already exists at the exact location, exiting customMetadata will be removed. In case the request body has customMetadata, setting overwriteCustomMetadata to false has no effect and request's customMetadata is set on the asset. |
| customMetadata   | Object | Optional. JSON key-value data to be associated with the asset. |
| inputRef   | Reference | Optional. Forward reference to the core HTMLInputElement.|
| onUploadStart | Function callback | Optional. Called before the upload is started. The first and only argument is the HTML input's change event |
| onUploadProgress | Function callback | Optional. Called while an upload is in progress. The first and only argument is the ProgressEvent |
| validateFile | Function callback | Optional. Called before the upload is started to run custom validation. The first and only argument is the file selected for upload. If the callback returns `true`, the upload is allowed to continue. But, if it returns `false`, the upload is not done |
| onSuccess   | Function callback | Optional. Called if the upload is successful. The first and only argument is the response JSON from the upload API. The request-id, response headers, and HTTP status code are also accessible using the $ResponseMetadata key that is exposed from the [javascript sdk](https://github.com/imagekit-developer/imagekit-javascript#access-request-id-other-response-headers-and-http-status-code) |
| onError   | Function callback | Optional. Called if upload results in an error. The first and only argument is the error received from the upload API |
| urlEndpoint      | String | Optional. If not specified, the URL-endpoint specified in the parent `IKContext` component is used. For example, https://ik.imagekit.io/your_imagekit_id/endpoint/ |
| publicKey      | String | Optional. If not specified, the `publicKey` specified in the parent `IKContext` component is used.|
| authenticationEndpoint      | String | Optional. If not specified, the `authenticationEndpoint` specified in the parent `IKContext` component is used. |

> Make sure that you have specified `authenticationEndpoint` and `publicKey` in `IKUpload` or in the parent `IKContext` component as a prop. The SDK makes an HTTP GET request to this endpoint and expects a JSON response with three fields i.e. `signature`, `token`, and `expire`. [Learn how to implement authenticationEndpoint](https://docs.imagekit.io/api-reference/upload-file-api/client-side-file-upload#how-to-implement-authenticationendpoint-endpoint) on your server. Refer to [demo application](#demo-application) for an example implementation.

#### Abort upload

ref can be passed to obtain access to the IKUpload component's instance. Currently, only 1 `abort` method is supported to be called on the ref. Calling the `abort` method will abort the upload if any is in progress.

Sample Usage

```js
const onUploadStart = (evt) => {
  console.log('Started', evt);
};

const onUploadProgress = (evt) => {
  console.log('Progress: ', evt);
};

const onError = (err) => {
  console.log('Error');
  console.log(err);
};

const onSuccess = (res) => {
  console.log('Success');
  console.log(res);
};

<IKContext
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  authenticationEndpoint="http://www.yourserver.com/auth"
>
  <IKUpload
    onError={onError}
    onSuccess={onSuccess}
    onUploadStart={onUploadStart}
    onUploadProgress={onUploadProgress}
  />
</IKContext>;
```

Custom Button Example, using inputRef

```js
const reftest = useRef(null);

const onError = (err) => {
  console.log('Error');
  console.log(err);
};

const onSuccess = (res) => {
  console.log('Success');
  console.log(res);
};

<IKContext
  publicKey="your_public_api_key"
  urlEndpoint="https://ik.imagekit.io/your_imagekit_id"
  authenticationEndpoint="http://www.yourserver.com/auth"
>
  <IKUpload
    onError={onError}
    onSuccess={onSuccess}
    inputRef={reftest}
    style={{display: 'none'}} // hide default button
  />
  <h1>Custom Upload Button</h1>
  {reftest && <button className='custom-button-style' onClick={() => reftest.current.click()}>Upload</button>}
</IKContext>;
```

## IKCore

Accessing the underlying [ImageKit javascript SDK](https://github.com/imagekit-developer/imagekit-javascript) is possible using the `IKCore` import. For example:

```js
import { IKCore } from "imagekitio-react"
// Generate image URL
var imagekit = new IKCore({
    publicKey: "your_public_api_key",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id",
    authenticationEndpoint: "http://www.yourserver.com/auth",
});
//https://ik.imagekit.io/your_imagekit_id/endpoint/tr:h-300,w-400/default-image.jpg
var imageURL = imagekit.url({
    path: "/default-image.jpg",
    urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/endpoint/",
    transformation: [{
        "height": "300",
        "width": "400"
    }]
});
```

## Error Handling

You can use `ErrorBoundary` to handle errors anywhere in their child component tree. Log those errors or display a fallback UI instead of the crashed component tree. For example:

```js
// urlEndpoint should be present in IKImage or parent IKContext component; otherwise, it will throw an error. For example:
<ErrorBoundary>
  <IKImage
    path = "/default-image.jpg"
    transformation={[
      {
        height:300,
        width:400
      }
    ]}
  />
</ErrorBoundary>
```

## Support

For any feedback or to report any issues or general implementation support, please reach out to [support@imagekit.io](mailto:support@imagekit.io)

## Links
* [Documentation](https://docs.imagekit.io)
* [Main website](https://imagekit.io)

## License
Released under the MIT license.
