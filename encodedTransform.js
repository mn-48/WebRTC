const supportsEncodedTransforms = window.RTCRtpReceiver && "transform" in RTCRtpSender.prototype;

// Get video stream and  MediaTrack 
const stream = await navigator.mediaDevices.getUserMedia({
    video: true
});


const [track] = stream.getTracks();


const videoSender = peerConnection.addTrack(track, stream)


// Create a worker containing a TransformStream
const worker = new Worker("worker.js");
videoSender.transform = new RTCRtpScriptTransform(worker, {
  name: "senderTransform",
});


addEventListener("rtctransform", (event) => {
    const transform = new TransformStream({
      start() {}, // Called on startup.  // start recoding ------------------------------> 00:00:01
      flush() {}, // Called when the stream is about to be closed. //  save recoding ----> 00:53:29
      async transform(encodedFrame, controller) {
        // Reconstruct the original frame.
        const view = new DataView(encodedFrame.data);
  
        // Construct a new buffer
        const newData = new ArrayBuffer(encodedFrame.data.byteLength);
        const newView = new DataView(newData);
  
        // Negate all bits in the incoming frame
        for (let i = 0; i < encodedFrame.data.byteLength; ++i) {
          newView.setInt8(i, ~view.getInt8(i));
        }
  
        encodedFrame.data = newData;
        controller.enqueue(encodedFrame);
      },
    });
    event.transformer.readable
      .pipeThrough(transform)
      .pipeTo(event.transformer.writable);
  });
  


  // Code to instantiate transform and attach them to sender/receiver pipelines.
onrtctransform = (event) => {
    let transform;
    if (event.transformer.options.name == "senderTransform")
      transform = createSenderTransform(); // returns a TransformStream
    else if (event.transformer.options.name == "receiverTransform")
      transform = createReceiverTransform(); // returns a TransformStream
    else return;
    event.transformer.readable
      .pipeThrough(transform)
      .pipeTo(event.transformer.writable);
  };
  


  // Create a worker containing a TransformStream
// const worker = new Worker("worker.js");

// Create a channel
// Pass channel.port2 to the transform as a constructor option
// and also transfer it to the worker
const channel = new MessageChannel();
const transform = new RTCRtpScriptTransform(
  worker,
  { purpose: "encrypt", port: channel.port2 },
  [channel.port2],
);

// Use the port1 to send a string.
// (we can send and transfer basic types/objects).
channel.port1.postMessage("A message for the worker");
channel.port1.start();
