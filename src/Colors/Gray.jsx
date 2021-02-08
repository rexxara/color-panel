const Gray = new Array(11).fill(233).map((k, i) => {
    const num=i*25.5
    console.log(num)
    return {
        rgb: `rgb(${num},${num},${num})`,
        desc: i + '',
        tags: [i + ''],
    }
})
export default Gray