// import Profile from "../models/profile.js";

// // Create or update profile
// export const createOrUpdateProfile = async (req, res) => {
//   try {
//     const { bio, age, gender, interests } = req.body;

//     let imageUrl = null;
//     if (req.file) {
//       imageUrl = req.file.path; // Cloudinary URL is stored by multer-storage-cloudinary
//     }

//     let profile = await Profile.findOne({ user: req.user._id });

//     if (profile) {
//       profile.bio = bio || profile.bio;
//       profile.age = age || profile.age;
//       profile.gender = gender || profile.gender;
//       profile.interests = interests || profile.interests;
//       if (imageUrl) profile.image = imageUrl;
//       await profile.save();
//     } else {
//       profile = await Profile.create({
//         user: req.user._id,
//         bio,
//         age,
//         gender,
//         interests,
//         image: imageUrl,
//       });
//     }

//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all profiles
// export const getProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("user", "name email");
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// import Profile from "../models/profile.js";

// // Create or update profile
// export const createOrUpdateProfile = async (req, res) => {
//   try {
//     const { bio, age, gender, interests } = req.body;

//     let imageUrl = null;
//     if (req.file) {
//       imageUrl = req.file.path; // Cloudinary URL is stored by multer-storage-cloudinary
//     }

//     let profile = await Profile.findOne({ user: req.user._id });

//     if (profile) {
//       profile.bio = bio || profile.bio;
//       profile.age = age || profile.age;
//       profile.gender = gender || profile.gender;
//       profile.interests = interests || profile.interests;
//       if (imageUrl) profile.image = imageUrl;
//       await profile.save();
//     } else {
//       profile = await Profile.create({
//         user: req.user._id,
//         bio,
//         age,
//         gender,
//         interests,
//         image: imageUrl,
//       });
//     }

//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all profiles
// export const getProfiles = async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate("user", "name email");
//     res.json(profiles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };











import Profile from "../models/profile.js";

// Create or Update Profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";

    // ✅ Handle interests (string or JSON array)
    let interests = [];
    if (req.body.interests) {
      try {
        if (typeof req.body.interests === "string") {
          // Agar plain string hai (e.g. "i like you")
          if (req.body.interests.trim().startsWith("["))
            interests = JSON.parse(req.body.interests); // JSON array string
          else
            interests = [req.body.interests]; // simple string
        } else {
          interests = req.body.interests;
        }
      } catch {
        interests = [req.body.interests];
      }
    }

    // ✅ Handle attributes (always array/object)
    let attributes = [];
    if (req.body.attributes) {
      try {
        attributes = typeof req.body.attributes === "string"
          ? JSON.parse(req.body.attributes)
          : req.body.attributes;
      } catch {
        return res.status(400).json({ error: "Invalid attributes format" });
      }
    }

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      // 🔹 Update profile
      profile.bio = req.body.bio || profile.bio;
      profile.age = req.body.age || profile.age;
      profile.gender = req.body.gender || profile.gender;
      profile.interests = interests.length ? interests : profile.interests;
      profile.attributes = attributes.length ? attributes : profile.attributes;
      if (imageUrl) profile.image = imageUrl;

      await profile.save();
      return res.status(200).json({ message: "Profile updated successfully", profile });
    } else {
      // 🔹 Create new profile
      const newProfile = new Profile({
        user: req.user._id,
        bio: req.body.bio,
        age: req.body.age,
        gender: req.body.gender,
        interests,
        image: imageUrl,
        attributes,
      });

      const savedProfile = await newProfile.save();
      return res.status(201).json({ message: "Profile created successfully", profile: savedProfile });
    }
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ error: "Profile creation failed", details: err.message });
  }
};

// Get All Profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
