export const handleImageUpload = (file) =>
    new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('image', file)

        fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => resolve(result.data.url))
            .catch(() => reject(new Error('Upload failed')))
    })
