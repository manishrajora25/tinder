// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import instance from "../AxiosConfig";

// export default function ProfilePage() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await instance.get(`/post/profile/${id}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.log("Profile Load Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!profile?.user) return <p>User Not Found</p>;

//   const user = profile.user;
//   const posts = profile.posts;

//   return (
//     <div className="max-w-3xl mx-auto p-4">

//       {/* USER DETAILS */}
//       <div className="flex flex-col items-center mt-6">
//         <img
//           src={user.image || "/default.png"}
//           alt="user"
//           className="w-32 h-32 rounded-full object-cover shadow-lg border"
//         />
//         <h1 className="text-2xl font-bold mt-3">{user.name}</h1>
//         <p className="text-gray-600">{user.email}</p>
//       </div>

//       {/* LINE DIVIDER */}
//       <div className="border-b my-6"></div>

//       {/* POSTS SECTION */}
//       <h2 className="text-xl font-semibold mb-4">Posts</h2>

//       {posts.length === 0 ? (
//         <p className="text-gray-500">No posts yet</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-4">
//           {posts.map(post => (
//             <div
//               key={post._id}
//               className="bg-white rounded-xl shadow p-4 border border-gray-200"
//             >
//               {/* POST IMAGE */}
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="post"
//                   className="w-full rounded-lg object-cover mb-3"
//                 />
//               )}

//               {/* POST TITLE */}
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {post.title || "Untitled Post"}
//               </h3>

//               {/* POST DESCRIPTION */}
//               <p className="text-gray-600 mt-1">
//                 {post.description || "No description"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import instance from "../AxiosConfig";

// export default function ProfilePage() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await instance.get(`/post/profile/${id}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.log("Profile Load Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!profile?.user) return <p>User Not Found</p>;

//   const user = profile.user;
//   const posts = profile.posts;

//   return (
//     <div className="max-w-3xl mx-auto p-4">

//       {/* USER DETAILS */}
//       <div className="flex flex-col items-center mt-6">
//         <img
//           src={user.image || "/default.png"}
//           alt="user"
//           className="w-32 h-32 rounded-full object-cover shadow-lg border"
//         />
//         <h1 className="text-2xl font-bold mt-3">{user.name}</h1>
//         <p className="text-gray-600">{user.email}</p>
//       </div>

//       <div className="border-b my-6"></div>

//       {/* POSTS */}
//       <h2 className="text-xl font-semibold mb-4">Posts</h2>

//       {posts.length === 0 ? (
//         <p className="text-gray-500">No posts yet</p>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="bg-white rounded-xl shadow p-4 border border-gray-200"
//             >
//               {/* IMAGES GRID */}
//               <div className="grid grid-cols-2 gap-3 mb-3">
//                 {post.images?.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt="post"
//                     className="w-full h-48 rounded-lg object-cover"
//                   />
//                 ))}
//               </div>

//               {/* TITLE */}
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {post.title}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className="text-gray-600 mt-1">{post.description}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../AxiosConfig";

export default function ProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await instance.get(`/post/profile/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.log("Profile Load Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!profile?.user) return <p>User Not Found</p>;

  const user = profile.user;
  const posts = profile.posts;

  // ⚡ Profile image = pehli post ki pehli image
  const profileImage =
    user.image ||
    (posts.length > 0 && posts[0].images.length > 0
      ? posts[0].images[0]
      : "/default.png");

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* USER DETAILS */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={profileImage}
          alt="user"
          className="w-32 h-32 rounded-full object-cover shadow-lg border"
        />

        <h1 className="text-2xl font-bold mt-3">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="border-b my-6"></div>

      {/* POSTS */}
      <h2 className="text-xl font-semibold mb-4">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow p-4 border border-gray-200"
            >
              {/* IMAGES GRID */}
              <div className="grid grid-cols-3 gap-3 mb-3">
  {post.images?.map((img, i) => (
    <img
      key={i}
      src={img}
      alt="post"
      className="w-full h-40 rounded-lg object-contain "
    />
  ))}
</div>


              {/* TITLE */}
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-600 mt-1">{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
