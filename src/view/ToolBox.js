import React from "react";
import Dropzone from 'react-dropzone'

export const ToolBox = (props) => {

    return (
        <div className="toolbox-container">
            <div className="drop-zone-container">
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className="drop-zone" {...getRootProps()}>
                                <input  />
                                <p>Dropzone</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        </div>
    )
};