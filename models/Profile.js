const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema 
const ProfileSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, // Associates the user by its id
      ref: 'users'
    },
    handle: {
      type: String, 
      required: true,
      max: 40   //40 characters
    },
    company: {
      type: String,
    },
    website: {
      type: String, 
    },
    location: {
      type: String,
    },
    status: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],  // An array of strings type
      required: true,
    },
    bio: {
      type: String,
    },
    githubusername: {  // TODO: Add in github API
      type: String,
    },
    experience: [  // imbeded object
      {
        title: {
          type: String, 
          required: true,
        },
        company: {
          type: String, 
          required: true,
        },
        location: {
          type: String,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,   //  This will be a checkbox 
        },
        current: {
          type: Boolean, 
          default: false,
        },
        description: {
          type: String,
        }
      }
    ],
    
        education: [  // imbeded object
      {
        school: {
          type: String, 
          required: true,
        },
        degree: {
          type: String, 
          required: true,
        },
        fieldofstudy: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: {
          type: Date,   //  This will be a checkbox 
        },
        current: {
          type: Boolean, 
          default: false,
        },
        description: {
          type: String,
        }
      }
    ],
    social: {
      youtube: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      }
    },
    date: {
        type: Date, 
        default: Date.now,
      }
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);


	
	
