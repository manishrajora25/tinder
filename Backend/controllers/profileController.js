
// import Profile from "../models/profile.js";


// export const createOrUpdateProfile = async (req, res) => {
//   try {
//     const imageUrl = req.file ? req.file.path : ""; // multer-cloudinary से आने वाला url

//     // Interests parsing (same as before)
//     let interests = [];
//     if (req.body.interests) {
//       try {
//         if (typeof req.body.interests === "string") {
//           if (req.body.interests.trim().startsWith("[")) {
//             interests = JSON.parse(req.body.interests);
//           } else {
//             interests = [req.body.interests];
//           }
//         } else {
//           interests = req.body.interests;
//         }
//       } catch {
//         interests = [req.body.interests];
//       }
//     }

//     // Attributes parsing (same as before)
//     let attributes = [];
//     if (req.body.attributes) {
//       try {
//         attributes =
//           typeof req.body.attributes === "string"
//             ? JSON.parse(req.body.attributes)
//             : req.body.attributes;
//       } catch {
//         return res.status(400).json({ error: "Invalid attributes format" });
//       }
//     }

//     let profile = await Profile.findOne({ user: req.user._id });

//     if (profile) {
//       // 🔹 Update existing profile (bilkul product jaise assign hoga)
//       profile.bio = req.body.bio || profile.bio;
//       profile.age = req.body.age || profile.age;
//       profile.gender = req.body.gender || profile.gender;
//       profile.interests = interests.length ? interests : profile.interests;
//       profile.attributes = attributes.length ? attributes : profile.attributes;
//       profile.image = imageUrl || profile.image; // always url assign karega

//       await profile.save();
//       return res.status(200).json({
//         message: "Profile updated successfully",
//         profile,
//       });
//     } else {
//       // 🔹 Create new profile
//       const newProfile = new Profile({
//         user: req.user._id,
//         bio: req.body.bio,
//         age: req.body.age,
//         gender: req.body.gender,
//         interests,
//         image: imageUrl, // url from cloudinary
//         attributes,
//       });

//       const savedProfile = await newProfile.save();
//       return res.status(201).json({
//         message: "Profile created successfully",
//         profile: savedProfile,
//       });
//     }
//   } catch (err) {
//     console.error("Profile Error:", err);
//     res.status(500).json({
//       error: "Profile creation failed",
//       details: err.message,
//     });
//   }
// };



// export const getProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("user", "name email");
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };







// import Profile from "../models/Profile.js";

// export const createOrUpdateProfile = async (req, res) => {
//   try {
//     // ✅ Multer-Cloudinary automatically uploads and returns file.path as URL
//     const imageUrl = req.file ? req.file.path : "";

//     // ✅ Handle interests safely
//     let interests = [];
//     if (req.body.interests) {
//       try {
//         if (typeof req.body.interests === "string") {
//           if (req.body.interests.trim().startsWith("[")) {
//             interests = JSON.parse(req.body.interests);
//           } else {
//             interests = req.body.interests.split(",").map((i) => i.trim());
//           }
//         }
//       } catch {
//         interests = [req.body.interests];
//       }
//     }

//     // ✅ Handle attributes safely
//     let attributes = [];
//     if (req.body.attributes) {
//       try {
//         attributes =
//           typeof req.body.attributes === "string"
//             ? JSON.parse(req.body.attributes)
//             : req.body.attributes;
//       } catch {
//         return res.status(400).json({ error: "Invalid attributes format" });
//       }
//     }

//     let profile = await Profile.findOne({ user: req.user._id });

//     if (profile) {
//       profile.bio = req.body.bio || profile.bio;
//       profile.age = req.body.age || profile.age;
//       profile.gender = req.body.gender || profile.gender;
//       profile.interests = interests.length ? interests : profile.interests;
//       profile.attributes = attributes.length ? attributes : profile.attributes;
//       if (imageUrl) profile.image = imageUrl; // ✅ update only if new image uploaded

//       await profile.save();
//       return res.status(200).json({
//         message: "Profile updated successfully",
//         profile,
//       });
//     } else {
//       const newProfile = new Profile({
//         user: req.user._id,
//         bio: req.body.bio,
//         age: req.body.age,
//         gender: req.body.gender,
//         interests,
//         image: imageUrl,
//         attributes,
//       });

//       const savedProfile = await newProfile.save();
//       return res.status(201).json({
//         message: "Profile created successfully",
//         profile: savedProfile,
//       });
//     }
//   } catch (err) {
//     console.error("Profile Error:", err);
//     res.status(500).json({
//       error: "Profile creation failed",
//       details: err.message,
//     });
//   }
// };

// export const getProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("user", "name email");
//     res.status(200).json(profiles);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch profiles" });
//   }
// };








import Profile from "../models/Profile.js";

// Create profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if profile already exists
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists. Use update instead." });
    }

    const imageUrl = req.file ? req.file.path : "";

    const interests = req.body.interests
      ? req.body.interests.includes(",")
        ? req.body.interests.split(",").map((i) => i.trim())
        : [req.body.interests]
      : [];

    const profile = new Profile({
      user: userId,
      bio: req.body.bio,
      age: req.body.age,
      gender: req.body.gender,
      interests,
      image: imageUrl,
    });

    const savedProfile = await profile.save();
    res.status(201).json({ message: "Profile created successfully", profile: savedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile creation failed", error: err.message });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profileId = req.params.id;

    // Find profile and ensure it belongs to logged-in user
    const profile = await Profile.findOne({ _id: profileId, user: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found or unauthorized" });
    }

    const imageUrl = req.file ? req.file.path : profile.image;

    const interests = req.body.interests
      ? req.body.interests.includes(",")
        ? req.body.interests.split(",").map((i) => i.trim())
        : [req.body.interests]
      : profile.interests;

    profile.bio = req.body.bio || profile.bio;
    profile.age = req.body.age || profile.age;
    profile.gender = req.body.gender || profile.gender;
    profile.interests = interests;
    profile.image = imageUrl;

    const updatedProfile = await profile.save();
    res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};

// Get all profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.status(200).json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profiles", error: err.message });
  }
};






// Get logged-in user's profile
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ user: userId }).populate("user", "name email");

    if (!profile) {
      return res.status(404).json({ message: "No profile found for this user" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user profile", error: err.message });
  }
};

