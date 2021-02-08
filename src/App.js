import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Alert from '@material-ui/lab/Alert';
import green from './Colors/Green'
import Gray from './Colors/Gray'
import SkinA from './Colors/SkinA'
import SkinB from './Colors/SkinB'
import BrownHair from './Colors/BrownHair'
import BlueHair from './Colors/BlueHair'
import LightBrownHair from './Colors/LightBrownHair'
import BlueLeggy from './Colors/BlueLeggy'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100vw',
    overflow: 'hidden',
    paddingTop: '5vw'
  },
  paper: {
    height: '12vw',
    width: '12vw',
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const Colors = [{
  row: green,
  desc: '测试绿色'
},{
  row:Gray,
  desc:'测试灰色'
},{
  row:SkinA,
  desc:'默认皮肤A'
},{
  row:SkinB,
  desc:'某教程的皮肤B'
},{
  row:BrownHair,
  desc:'褐色头发'
},{
  row:BlueHair,
  desc:'HK416蓝色头发'
},{
  row:LightBrownHair,
  desc:'某教程的浅褐色头发'
},{
  row:BlueLeggy,
  desc:'蓝色丝袜'
},]
const voidKey = { element: undefined, key: '' }
export default function SpacingGrid() {
  const spacing = 2
  const classes = useStyles();
  const [currentKey, setCurrentKey] = React.useState(voidKey)
  const handleClick = (el, key) => {
    if (currentKey.key===key) {
      setCurrentKey(voidKey)
    } else {
      setCurrentKey({ element: el, key: key })
    }
  }
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        {Colors.map((v, i) => {
          return <Grid key={i} container justify="center" spacing={spacing}>
            <Alert style={{width:'85vw',margin:"5vw 5vw"}} severity="info">{v.desc}</Alert>
            {v.row.map((vv, ii) => {
              const _key = '' + i + ii;
              const open = currentKey.key === _key
              const id = open ? 'simple-popper' : undefined;
              return <Grid key={ii} item>
                <Popper anchorEl={currentKey.element} id={id} open={open} >
                  <Paper
                    className={classes.paper} >
                    {vv.desc}
                  </Paper>
                </Popper>
                <Paper aria-describedby={_key} type="button"
                  onClick={(ev) => handleClick(ev.target, _key)}
                  className={classes.paper} style={{ background: vv.rgb }} />
              </Grid>
            })}
          </Grid>
        })}
      </Grid>
    </Grid>
  );
}