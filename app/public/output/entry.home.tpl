<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/normalize.css" type="text/css">
    <title>{{title}}</title>
</head>

<body>
    home {{options}}

    <button onclick="handleClick()">get</button>
    <button onclick="handleClick2()">add</button>

    <script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
    <script type="text/javascript">
        const handleClick = async () => {
            const signKey = "sxyanfu19921115";
            const st = Date.now();
            const signature = md5(`${signKey}_${st}`);
            const res = await axios.get('/api/project/list', {
                headers: {
                    's_sign': signature,
                    's_t': st
                }
            });

            console.log(res.data)
        }

        const handleClick2 = async () => {
            const res = await axios.post('/api/project/add', {
                name: '项目1',
                desc: '项目1描述'
            });

            console.log(res.data)
        }
    </script>
</body>

</html>