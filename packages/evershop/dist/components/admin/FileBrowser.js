import { Button } from '@components/common/ui/Button.js';
import React from 'react';
import './FileBrowser.scss';
import { useQuery } from 'urql';
import Spinner from '@components/admin/Spinner.js';
import { Input } from '@components/common/ui/Input.js';
const GetApisQuery = `
  query Query ($filters: [FilterInput!]) {
    browserApi: url(routeId: "fileBrowser", params: [{key: "0", value: ""}])
    deleteApi: url(routeId: "fileDelete", params: [{key: "0", value: ""}])
    uploadApi: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    folderCreateApi: url(routeId: "folderCreate")
  }
`;
const File = ({ file, select })=>{
    const className = file.isSelected === true ? 'selected' : '';
    return /*#__PURE__*/ React.createElement("div", {
        className: `col image-item ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "inner"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>{
            e.preventDefault();
            select(file);
        }
    }, /*#__PURE__*/ React.createElement("img", {
        src: file.url,
        alt: ""
    })), file.isSelected === true && /*#__PURE__*/ React.createElement("div", {
        className: "select fill-current text-primary"
    }, /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '2rem'
        },
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-4 w-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    })))));
};
const FileBrowser = ({ onInsert, isMultiple, close })=>{
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [folders, setFolders] = React.useState([]);
    const [files, setFiles] = React.useState([]);
    const [currentPath, setCurrentPath] = React.useState([
        {
            name: '',
            index: 0
        }
    ]);
    const newFolderRefInput = React.useRef(null);
    const browserApiRef = React.useRef('');
    const deleteApiRef = React.useRef('');
    const uploadApiRef = React.useRef('');
    const folderCreateApiRef = React.useRef('');
    const onSelectFolder = (e, f)=>{
        e.preventDefault();
        setCurrentPath(currentPath.concat({
            name: f,
            index: currentPath.length + 1
        }));
    };
    const onSelectFolderFromBreadcrumb = (e, index)=>{
        e.preventDefault();
        const newPath = [];
        currentPath.forEach((f)=>{
            if (f.index <= index) newPath.push(f);
        });
        setCurrentPath(newPath);
    };
    const onSelectFile = (f)=>{
        if (isMultiple === false) {
            setFiles(files.map((file)=>{
                if (f.name === file.name) {
                    file.isSelected = !file.isSelected;
                } else {
                    file.isSelected = false;
                }
                return file;
            }));
        } else {
            setFiles(files.map((file)=>{
                if (f.name === file.name) {
                    file.isSelected = true;
                } else {
                    file.isSelected = false;
                }
                return file;
            }));
        }
    };
    const closeFileBrowser = (e)=>{
        e.preventDefault();
        close();
    };
    const createFolder = (e, folder)=>{
        e.preventDefault();
        if (!folder || !folder.trim()) {
            setError('Invalid folder name');
            return;
        }
        const path = currentPath.map((f)=>f.name);
        path.push(folder.trim());
        setLoading(true);
        fetch(folderCreateApiRef.current, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: path.join('/')
            }),
            credentials: 'same-origin'
        }).then((res)=>res.json()).then((response)=>{
            if (!response.error) {
                // Get the first level folder, incase of recursive folder creation
                const recursiveFolders = folder.split('/');
                setFolders([
                    ...new Set(folders.concat(recursiveFolders[0]))
                ]);
            } else {
                setError(response.error.message);
            }
        }).catch((err)=>setError(err.message)).finally(()=>setLoading(false));
    };
    const deleteFile = ()=>{
        let file;
        files.forEach((f)=>{
            if (f.isSelected === true) {
                file = f;
            }
        });
        if (!file) {
            setError('No file selected');
        } else {
            const path = currentPath.map((f)=>f.name);
            path.push(file.name);
            setLoading(true);
            fetch(deleteApiRef.current + path.join('/'), {
                method: 'DELETE'
            }).then((res)=>res.json()).then((response)=>{
                if (!response.error) {
                    setCurrentPath(currentPath.map((f)=>f));
                } else {
                    setError(response.error.message);
                }
            }).catch((err)=>setError(err.message)).finally(()=>setLoading(false));
        }
    };
    const insertFile = ()=>{
        let file;
        files.forEach((f)=>{
            if (f.isSelected === true) {
                file = f;
            }
        });
        if (!file) {
            setError('No file selected');
        } else {
            onInsert(file.url);
        }
    };
    const onUpload = (e)=>{
        e.persist();
        const formData = new FormData();
        for(let i = 0; i < e.target.files.length; i += 1)formData.append('images', e.target.files[i]);
        const path = [];
        currentPath.forEach((f)=>{
            path.push(f.name);
        });
        setLoading(true);
        fetch(uploadApiRef.current + path.join('/'), {
            method: 'POST',
            body: formData
        }).then((res)=>res.json()).then((response)=>{
            if (!response.error) {
                setCurrentPath(currentPath.map((f)=>f));
            } else {
                setError(response.error.message);
            }
        }).catch((err)=>setError(err.message)).finally(()=>setLoading(false));
    };
    // Create a function to fetch files and folders to avoid code duplication
    const fetchFilesAndFolders = React.useCallback(()=>{
        if (!browserApiRef.current) {
            return;
        }
        const path = currentPath.map((f)=>f.name);
        setLoading(true);
        fetch(browserApiRef.current + path.join('/'), {
            method: 'GET'
        }).then((res)=>res.json()).then((response)=>{
            if (!response.error) {
                setFolders(response.data.folders);
                setFiles(response.data.files);
            } else {
                setError(response.error.message);
            }
        }).catch((e)=>setError(e.message)).finally(()=>setLoading(false));
    }, [
        currentPath
    ]);
    const [result] = useQuery({
        query: GetApisQuery
    });
    const { data, fetching, error: err } = result;
    if (data) {
        browserApiRef.current = data.browserApi;
        deleteApiRef.current = data.deleteApi;
        uploadApiRef.current = data.uploadApi;
        folderCreateApiRef.current = data.folderCreateApi;
    }
    // Fetch files and folders when APIs are ready
    React.useEffect(()=>{
        if (data) {
            fetchFilesAndFolders();
        }
    }, [
        currentPath,
        fetchFilesAndFolders,
        data
    ]);
    if (err) {
        return /*#__PURE__*/ React.createElement("p", {
            className: "text-destructive"
        }, "There was an error fetching file browser APIs.", err.message);
    }
    if (fetching) {
        return /*#__PURE__*/ React.createElement("div", {
            className: "fixed top-0 left-0 bottom-0 right-0 flex justify-center"
        }, /*#__PURE__*/ React.createElement(Spinner, {
            width: 30,
            height: 30
        }));
    }
    return /*#__PURE__*/ React.createElement("div", {
        className: "file-browser"
    }, loading === true && /*#__PURE__*/ React.createElement("div", {
        className: "fixed top-0 left-0 bottom-0 right-0 flex justify-center"
    }, /*#__PURE__*/ React.createElement(Spinner, {
        width: 30,
        height: 30
    })), /*#__PURE__*/ React.createElement("div", {
        className: "content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-end"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>closeFileBrowser(e),
        className: "text-interactive fill-current"
    }, /*#__PURE__*/ React.createElement("svg", {
        style: {
            width: '2rem'
        },
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-4 w-4",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M6 18L18 6M6 6l12 12"
    })))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-4 gap-5"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "col-span-1"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "current-path mb-10"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pr-2"
    }, "You are here:"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("a", {
        href: "#",
        onClick: (e)=>onSelectFolderFromBreadcrumb(e, 0),
        className: "text-primary hover:underline"
    }, "Root")), currentPath.filter((f)=>f.name !== '').map((f, index)=>/*#__PURE__*/ React.createElement("div", {
            key: index
        }, /*#__PURE__*/ React.createElement("span", null, "/"), /*#__PURE__*/ React.createElement("a", {
            className: "text-primary hover:underline",
            href: "#",
            onClick: (e)=>onSelectFolderFromBreadcrumb(e, f.index)
        }, f.name))))), /*#__PURE__*/ React.createElement("ul", {
        className: "mt-4 mb-4"
    }, folders.map((f, i)=>/*#__PURE__*/ React.createElement("li", {
            key: i,
            className: "text-primary fill-current flex list-group-item"
        }, /*#__PURE__*/ React.createElement("svg", {
            style: {
                width: '2rem',
                height: '2rem'
            },
            xmlns: "http://www.w3.org/2000/svg",
            className: "h-4 w-4",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor"
        }, /*#__PURE__*/ React.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        })), /*#__PURE__*/ React.createElement("a", {
            className: "pl-2 hover:underline",
            href: "#",
            onClick: (e)=>onSelectFolder(e, f)
        }, f))), folders.length === 0 && /*#__PURE__*/ React.createElement("li", {
        className: "list-group-item"
    }, /*#__PURE__*/ React.createElement("span", null, "There is no sub folder."))), /*#__PURE__*/ React.createElement("div", {
        className: "justify-start items-center gap-2 flex"
    }, /*#__PURE__*/ React.createElement(Input, {
        type: "text",
        placeholder: "New folder",
        ref: newFolderRefInput
    }), /*#__PURE__*/ React.createElement(Button, {
        onClick: (e)=>createFolder(e, newFolderRefInput.current?.value),
        variant: 'outline'
    }, "Create"))), /*#__PURE__*/ React.createElement("div", {
        className: "col-span-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "error text-destructive mb-5"
    }, error), /*#__PURE__*/ React.createElement("div", {
        className: "tool-bar grid grid-cols-3 gap-2 mb-5"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: "destructive",
        title: "Delete image",
        onClick: ()=>deleteFile()
    }, "Delete"), /*#__PURE__*/ React.createElement(Button, {
        variant: "default",
        title: "Insert image",
        onClick: ()=>insertFile()
    }, "Insert"), /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        onClick: ()=>{
            document.getElementById('upload-image').click();
        }
    }, "Upload"), /*#__PURE__*/ React.createElement("label", {
        className: "self-center",
        id: "upload-image-label",
        htmlFor: "upload-image"
    }, /*#__PURE__*/ React.createElement("a", {
        className: "invisible"
    }, /*#__PURE__*/ React.createElement("input", {
        id: "upload-image",
        type: "file",
        multiple: true,
        onChange: onUpload
    })))), files.length === 0 && /*#__PURE__*/ React.createElement("div", null, "There is no file to display."), /*#__PURE__*/ React.createElement("div", {
        className: "grid grid-cols-9 gap-2"
    }, files.map((f)=>/*#__PURE__*/ React.createElement(File, {
            file: f,
            select: onSelectFile,
            key: f.name
        }))))))));
};
export { FileBrowser };
