import Request from "../models/Request.js";

export const sendRequest = async (req, res) => {
  try {
    const sender = req.user._id;    // FIXED
    const { receiverId } = req.body;

    const exist = await Request.findOne({ sender, receiver: receiverId });
    if (exist) return res.json({ success: false, message: "Already sent!" });

    await Request.create({ sender, receiver: receiverId });

    return res.json({ success: true, message: "Request sent!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// 🟡 RECEIVER ko aayi hui requests dekhna
export const getMyRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await Request.find({ receiver: userId })
      .populate("sender", "name image");
      
      

    return res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// 🟢 ACCEPT request
// Accept request
export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.status === "accepted") {
      return res.json({ success: false, message: "Already accepted" });
    }

    if (request.status === "rejected") {
      return res.json({ success: false, message: "Request already rejected, cannot accept" });
    }

    request.status = "accepted";
    await request.save();

    res.json({ success: true, message: "Request accepted!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    if (request.status === "rejected") {
      return res.json({ success: false, message: "Already rejected" });
    }

    if (request.status === "accepted") {
      return res.json({ success: false, message: "Already accepted, cannot reject" });
    }

    request.status = "rejected";
    await request.save();

    res.json({ success: true, message: "Request rejected!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
