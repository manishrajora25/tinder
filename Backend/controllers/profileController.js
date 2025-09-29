import Profile from "../models/profile.js";

// Create or update profile
export const createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, age, gender, interests } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL is stored by multer-storage-cloudinary
    }

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      profile.bio = bio || profile.bio;
      profile.age = age || profile.age;
      profile.gender = gender || profile.gender;
      profile.interests = interests || profile.interests;
      if (imageUrl) profile.image = imageUrl;
      await profile.save();
    } else {
      profile = await Profile.create({
        user: req.user._id,
        bio,
        age,
        gender,
        interests,
        image: imageUrl,
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", "name email");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
