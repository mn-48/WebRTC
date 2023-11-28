RTCPeerConnection(): --------------------------------------------------------------
    canTrickleIceCandidates
    connectionState:
        new, connecting, connected, disconnected, failed, or closed
    
    currentLocalDescription
    currentRemoteDescription
    
    iceConnectionState:
        new, checking, connected, completed, failed, disconnected, or closed
        
    iceGatheringState:
        new, gathering, or complete
        
    localDescription
    remoteDescription
    
    peerIdentity 
        --> Promise
        
    pendingLocalDescription
    pendingRemoteDescription
    
    sctp
    signalingState:
        stable, have-local-offer, have-remote-offer, have-local-pranswer, have-remote-pranswer, or closed
    
    
Static methods: ----------------------------------------------------------------
    RTCPeerConnection.generateCertificate()
    
    
Instance methods:
    > Also inherits methods from EventTarget
    addIceCandidate()
    addTrack() 
        MediaStreamTrack
        
    addTransceiver()
        RTCRtpSender <------> RTCRtpReceiver
    close()
    createAnswer()
        SDP 
    createDataChannel()
    createOffer()
    getConfiguration()
    getIdentityAssertion()
    getReceivers()
        RTP 
    getSenders()
    
    getStats()
    getTransceivers()
    removeTrack()
    restartIce()
    setConfiguration()
    setIdentityProvider()
    
    setLocalDescription()
    setRemoteDescription()
    
❌ ---- > ✅
Obsolete methods:----------------------------------------------------------------
    addStream()----> addTrack() ✅
    
    createDTMFSender():
    removeStream() ----> removeTrack() ✅
        
        
Events:: addEventListener():----------------------------------------------------
    connectionstatechange
    datachannel
    icecandidate
    icecandidateerror
    icegatheringstatechange
    negotiationneeded
    signalingstatechange
    track
    