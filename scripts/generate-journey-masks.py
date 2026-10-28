from pathlib import Path
import re, math, heapq, array, sys, xml.etree.ElementTree as ET
from PIL import Image, ImageDraw
ROOT=Path('assets/bring-journey')
# A lighter, asymmetrical mobile silhouette; original illustration files are untouched.
curves=[((118,136),(121,140),(124,145),(129,154)),((129,154),(180,173),(267,147),(292,197)),((292,197),(316,240),(319,291),(274,317)),((274,317),(226,345),(116,350),(78,395)),((78,395),(50,430),(58,474),(112,510)),((112,510),(166,548),(268,538),(295,595)),((295,595),(322,650),(305,710),(283,744)),((283,744),(278,764),(281,780),(286,795))]
widths=[0,6,8,17,5,9,7,14,1.5]
def cubic(a,b,c,d,t): return ((1-t)**3*a+3*(1-t)**2*t*b+3*(1-t)*t*t*c+t**3*d)
left=[];right=[]
for k,points in enumerate(curves):
 for i in range(80):
  t=i/80; x=cubic(*[p[0] for p in points],t);y=cubic(*[p[1] for p in points],t)
  dx=3*(1-t)**2*(points[1][0]-points[0][0])+6*(1-t)*t*(points[2][0]-points[1][0])+3*t*t*(points[3][0]-points[2][0]);dy=3*(1-t)**2*(points[1][1]-points[0][1])+6*(1-t)*t*(points[2][1]-points[1][1])+3*t*t*(points[3][1]-points[2][1])
  size=widths[k]+(widths[k+1]-widths[k])*(.5-.5*math.cos(math.pi*t));length=math.hypot(dx,dy)
  left.append((x-dy/length*size,y+dx/length*size));right.append((x+dy/length*size,y-dx/length*size))
# A small rounded cap finishes the shorter taper, rather than a needle point.
end=curves[-1][-1];control=curves[-1][-2];dx=end[0]-control[0];dy=end[1]-control[1];length=math.hypot(dx,dy);tx,ty=dx/length,dy/length;nx,ny=-ty,tx;r=widths[-1]
left.append((end[0]+nx*r,end[1]+ny*r));right.append((end[0]-nx*r,end[1]-ny*r))
cap=[(end[0]+r*(nx*math.cos(t)+tx*math.sin(t)),end[1]+r*(ny*math.cos(t)+ty*math.sin(t))) for t in [math.pi*i/12 for i in range(1,12)]]
points=left+cap+right[::-1]
mobile_d='M'+' L'.join(f'{x:.3f} {y:.3f}' for x,y in points)+' Z'
(ROOT/'mobile-ribbon-refined.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="390" height="850" viewBox="0 0 390 850"><path fill="#6F0F18" d="'+mobile_d+'"/></svg>')

def flatten(d):
 tokens=re.findall(r'[A-Za-z]|[-+]?(?:\d*\.\d+|\d+)(?:[eE][-+]?\d+)?',d);i=0;cmd=None;p=(0,0);out=[]
 while i<len(tokens):
  if tokens[i].isalpha():cmd=tokens[i];i+=1
  if cmd=='Z':break
  n={'M':2,'L':2,'C':6,'H':1,'V':1}[cmd];v=list(map(float,tokens[i:i+n]));i+=n
  if cmd=='C':
   b=(v[0],v[1]);c=(v[2],v[3]);q=(v[4],v[5]);steps=max(8,math.ceil((math.dist(p,b)+math.dist(b,c)+math.dist(c,q))/1.5))
   for j in range(1,steps+1):out.append((cubic(p[0],b[0],c[0],q[0],j/steps),cubic(p[1],b[1],c[1],q[1],j/steps)))
   p=q
  else:
   p=(v[0],v[1]) if cmd in ['M','L'] else (v[0],p[1]) if cmd=='H' else (p[0],v[0]);out.append(p)
   if cmd=='M':cmd='L'
 return out

def make_map(svg_path,name,size,start):
 root=ET.parse(svg_path).getroot();d=next(e.attrib['d'] for e in root.iter() if e.tag.endswith('path'))
 w,h=size;shape=Image.new('L',size);vw,vh=map(float,root.attrib['viewBox'].split()[2:]);ImageDraw.Draw(shape).polygon([(x*w/vw,y*h/vh) for x,y in flatten(d)],fill=255);binary=shape.tobytes();pixels=[i for i,b in enumerate(binary) if b]
 seed=min(pixels,key=lambda i:(i%w-start[0])**2+(i//w-start[1])**2)
 distances=array.array('f',[float('inf')])*(w*h);distances[seed]=0;queue=[(0,seed)];visited=0
 while queue:
  value,index=heapq.heappop(queue)
  if value>distances[index]+.001:continue
  visited+=1;x=index%w;y=index//w
  for dx,dy,cost in [(-1,0,1),(1,0,1),(0,-1,1),(0,1,1),(-1,-1,1.41421356),(-1,1,1.41421356),(1,-1,1.41421356),(1,1,1.41421356)]:
   nx=x+dx;ny=y+dy
   if nx<0 or nx>=w or ny<0 or ny>=h:continue
   ni=ny*w+nx
   if not binary[ni]:continue
   candidate=value+cost
   if candidate+.001<distances[ni]:distances[ni]=candidate;heapq.heappush(queue,(candidate,ni))
 assert all(math.isfinite(distances[i]) for i in pixels),'Disconnected source silhouette'
 maximum=max(distances[i] for i in pixels)
 rgb=bytearray([255,255,0])*(w*h)
 # Encode 16-bit travel distance in R/G. The SVG filter thresholds both channels
 # in one matrix, avoiding an 8-bit/256-step reveal. Original SVG stays the artwork.
 for i in pixels:
  q=round(distances[i]/maximum*65534);rgb[i*3]=q//256;rgb[i*3+1]=q%256
 # Extend only the edge texels, without creating shortcuts through empty space.
 for i in pixels:
  x=i%w;y=i//w
  for dx,dy in [(-1,0),(1,0),(0,-1),(0,1)]:
   nx=x+dx;ny=y+dy
   if 0<=nx<w and 0<=ny<h:
    ni=ny*w+nx
    if not binary[ni]:rgb[ni*3:ni*3+3]=rgb[i*3:i*3+3]
 Image.frombytes('RGB',size,bytes(rgb)).save(ROOT/name,optimize=True)
 # Verify the actual visible ribbon is one connected region at every requested stage.
 for progress in [.15,.30,.50,.70,.85,1]:
  remaining={i for i in pixels if distances[i]<=maximum*progress}
  if not remaining:continue
  stack=[next(iter(remaining))];remaining.remove(stack[0]);count=0
  while stack:
   i=stack.pop();count+=1;x=i%w;y=i//w
   for dx,dy in [(-1,0),(1,0),(0,-1),(0,1),(-1,-1),(-1,1),(1,-1),(1,1)]:
    nx=x+dx;ny=y+dy
    if 0<=nx<w and 0<=ny<h:
     ni=ny*w+nx
     if ni in remaining:remaining.remove(ni);stack.append(ni)
  assert not remaining,(name,progress,len(remaining))
 print(name,'connected at all requested stages; travel length',round(maximum),'px')
if '--mobile-only' not in sys.argv:
 make_map(ROOT/'ribbon-original.svg','desktop-reveal-map.png',(1165,630),(164,100))
make_map(ROOT/'mobile-ribbon-refined.svg','mobile-reveal-map.png',(390,850),curves[0][0])
