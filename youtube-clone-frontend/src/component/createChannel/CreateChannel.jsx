import "./CreateChannel.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useState } from "react";
import axios from "axios";

function CreateChannel({handleCancelChannelPage}) {
    const [createChannelField, setCreateChannelField] = useState({"channelName":"", "channelDescription":"", "channelBanner":""});

    function handleInputFields(event, name) {
        setCreateChannelField({
            ...createChannelField,[name]:event.target.value
        })
    }

    console.log(createChannelField);

    async function uploadImage(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "youtube-clone");
        try {
            //cloudName = "dru7e6cnq"
            const response = await axios.post("https://api.cloudinary.com/v1_1/dru7e6cnq/image/upload", data);
            const imageUrl = response.data.url;
            setCreateChannelField({
                ...createChannelField,"channelBanner":imageUrl
            })
            console.log(response);
        } catch(err) {
        console.log(err);
        }
        console.log(files);
}

    return(
        <div className="createChannel">
           <div className="createChannelBlock">
                    <div className="createChannelBlock-title">
                    <YouTubeIcon sx={{fontSize: "54px", color: "red"}}/>
                            Create Channel
                    </div>
                    <div className="createChannelBlock-details">
                        <div className="channelName">
                                <input type="text" value={createChannelField.channelName} onChange={(e) => handleInputFields(e, "channelName")} className="channelNameInput" placeholder="Channel Name"/>
                        </div>
                        <div className="channelName">
                                <input type="text" value={createChannelField.channelDescription} onChange={(e) => handleInputFields(e, "channelDescription")} className="channelNameInput" placeholder="Channel Description"/>
                        </div>

                        <div className="channelBanner">
                        <p>Upload Banner:</p>
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        </div>

                        <div className="createChannelBtns">
                            <div className="createChannelBtn">Create Channel</div>
                            <div className="createChannelBtn" onClick={() => handleCancelChannelPage()}>Cancel</div>
                        </div>
                    </div>
           </div>
        </div>
    )
}

export default CreateChannel;