import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  // Fallback image URL
  const defaultImage = "/path/to/default/image.png";

  // Ensure post and post.creator are defined, and use defaultImage if post.creator.image is undefined
  const imageUrl = post?.creator?.image || defaultImage;

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="">
          <Image
            src={imageUrl}
            alt="User image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default User;