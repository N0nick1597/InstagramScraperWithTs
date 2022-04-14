import tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import tfnode from '@tensorflow/tfjs-node-gpu';
import fs from 'fs';

export default class MachineLearning {
  // code to import the Image
  private ReadImage = (path: any) => {
    const image = fs.readFileSync(path);
    //tfnode.node.decodeImage() : Given the encoded bytes of an image,
    //it returns a 3D or 4D tensor of the decoded image.Supports BMP, GIF, JPEG and PNG formats.
    const tfimage = tfnode.node.decodeImage(image);

    return tfimage;
  };

  public ClassifyImage = async (path: any) => {
    const image = this.ReadImage(path);
    //MobileNets are small, low-latency,
    //low - power models parameterized to meet the resource constraints of a variety of use cases
    const MobileNetModel = await mobilenet.load();
    //@ts-ignore
    const prediction = await MobileNetModel.classify(image);
    console.log('Classification Results:', prediction);
  };
}
